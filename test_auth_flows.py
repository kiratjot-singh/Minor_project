import os
import time
import random
import pytest
from playwright.sync_api import Page, expect

# ==========================================
# TEST CONFIGURATION
# ==========================================
BASE_URL = os.getenv("TEST_BASE_URL", "http://localhost:5173")

# Generate a random patient phone number so the test is isolated and repeatable
random_suffix = ''.join([str(random.randint(0, 9)) for _ in range(9)])
TEST_PATIENT_PHONE = f"9{random_suffix}"
TEST_PATIENT_PWD = "Patient@123"

# Note: Doctor & Receptionist require valid Hospital IDs, so you should create them manually once
TEST_DOCTOR_PHONE = os.getenv("TEST_DOCTOR_PHONE", "8888888888")
TEST_DOCTOR_PWD = os.getenv("TEST_DOCTOR_PWD", "Doctor@123")
TEST_RECEP_PHONE = os.getenv("TEST_RECEP_PHONE", "7777777777")
TEST_RECEP_PWD = os.getenv("TEST_RECEP_PWD", "Recep@123")


class TestCareFlowAuthentication:

    @pytest.fixture(autouse=True)
    def setup_and_teardown(self, page: Page):
        """Initialize Playwright Page before each test."""
        self.page = page
        os.makedirs("screenshots", exist_ok=True)
        yield
        # Teardown logic if needed. Playwright handles browser closing.

    def take_screenshot(self, name):
        """Helper to capture screenshots"""
        timestamp = time.strftime("%Y%m%d-%H%M%S")
        filename = f"screenshots/{name}_{timestamp}.png"
        self.page.screenshot(path=filename)
        print(f"\nScreenshot saved: {filename}")

    # ==========================================
    # HELPER METHODS
    # ==========================================
    def navigate_to_login(self, role="patient"):
        self.page.goto(BASE_URL)
        role_map = {"patient": "Patient Portal", "doctor": "Doctor", "receptionist": "Receptionist"}
        title = role_map.get(role)
        
        self.page.locator(f"//h3[text()='{title}']/ancestor::button").click()
        self.page.wait_for_url(f"**/login/{role}*")

    def switch_to_password_mode(self):
        pwd_toggle = self.page.locator("button", has_text="Password")
        pwd_toggle.click()
        self.page.locator("input[type='password']").wait_for(state="visible")

    def perform_login(self, phone, password):
        phone_input = self.page.locator("input[type='tel']")
        phone_input.fill(phone)

        pwd_input = self.page.locator("input[type='password']")
        pwd_input.fill(password)

        submit_btn = self.page.locator("button[type='submit']")
        submit_btn.click()

    def get_error_message(self):
        try:
            error_el = self.page.locator("div.error-box span")
            error_el.wait_for(state="visible", timeout=5000)
            return error_el.text_content()
        except Exception:
            return None

    # ==========================================
    # TEST CASES
    # ==========================================
    
    def test_routing_from_homepage(self):
        """TC_AUTH_01: Verify Role Select page routing"""
        self.page.goto(BASE_URL)
        expect(self.page.locator("body")).to_contain_text("CareFlow")
        
        patient_btn = self.page.locator("//h3[text()='Patient Portal']/ancestor::button")
        patient_btn.click()
        self.page.wait_for_url("**/login/patient*")

    def test_00_automate_patient_signup(self):
        """TC_AUTH_00: Automatically seed a patient account for subsequent tests"""
        try:
            self.page.goto(f"{BASE_URL}/signup/patient")
            
            # Fill form
            name_input = self.page.locator("#name")
            name_input.fill("Automated Test Patient")
            
            self.page.locator("#phone").fill(TEST_PATIENT_PHONE)
            self.page.locator("#password").fill(TEST_PATIENT_PWD)
            self.page.locator("#confirmPwd").fill(TEST_PATIENT_PWD)
            
            submit_btn = self.page.locator("button[type='submit']")
            submit_btn.click()
            
            # Wait for redirect to login
            self.page.wait_for_url("**/login/patient*")
        except Exception as e:
            self.take_screenshot("patient_signup_fail")
            raise e

    def test_patient_valid_login(self):
        """TC_AUTH_02: Patient Valid Login"""
        try:
            self.navigate_to_login("patient")
            self.switch_to_password_mode()
            self.perform_login(TEST_PATIENT_PHONE, TEST_PATIENT_PWD)
            
            self.page.wait_for_url("**/home/patient/*")
        except Exception as e:
            self.take_screenshot("patient_valid_login_fail")
            raise e

    def test_patient_invalid_login(self):
        """TC_AUTH_03: Patient Invalid Credentials"""
        try:
            self.navigate_to_login("patient")
            self.switch_to_password_mode()
            self.perform_login(TEST_PATIENT_PHONE, "WrongPassword123!")
            
            error_msg = self.get_error_message()
            assert error_msg is not None, "Error message box did not appear."
            
            # Updated assertion to catch 'incorrect'
            assert any(word in error_msg.lower() for word in ["invalid", "failed", "wrong", "incorrect"]), f"Unexpected error message: {error_msg}"
        except Exception as e:
            self.take_screenshot("patient_invalid_login_fail")
            raise e

    def test_empty_fields_validation(self):
        """TC_AUTH_04: Empty fields should disable login button"""
        try:
            self.navigate_to_login("patient")
            self.switch_to_password_mode()
            
            phone_input = self.page.locator("input[type='tel']")
            phone_input.fill("123")
            
            submit_btn = self.page.locator("button[type='submit']")
            expect(submit_btn).to_be_disabled()
        except Exception as e:
            self.take_screenshot("empty_fields_fail")
            raise e

    def test_doctor_valid_login(self):
        """TC_AUTH_05: Doctor Valid Login (Requires manual account creation first)"""
        try:
            self.navigate_to_login("doctor")
            self.switch_to_password_mode()
            self.perform_login(TEST_DOCTOR_PHONE, TEST_DOCTOR_PWD)
            
            self.page.wait_for_url("**/doctor/*")
        except Exception as e:
            self.take_screenshot("doctor_valid_login_fail")
            print("\nWARNING: Did you create the dummy doctor account (8888888888) manually first?")
            raise e

    def test_session_persistence_on_refresh(self):
        """TC_AUTH_08: Test refreshing the page maintains session"""
        try:
            self.navigate_to_login("patient")
            self.switch_to_password_mode()
            self.perform_login(TEST_PATIENT_PHONE, TEST_PATIENT_PWD)
            
            self.page.wait_for_url("**/home/patient/*")
            
            # Refresh the page
            self.page.reload()
            self.page.wait_for_timeout(2000) 
            
            assert "/home/patient/" in self.page.url
        except Exception as e:
            self.take_screenshot("session_persistence_fail")
            raise e
