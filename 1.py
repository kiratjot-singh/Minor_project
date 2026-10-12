from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()

driver.get("https://www.instagram.com/accounts/signup/")

wait = WebDriverWait(driver, 15)

username = wait.until(
    EC.presence_of_element_located((By.NAME, "email"))
)

password = wait.until(
    EC.presence_of_element_located((By.NAME, "pass"))
)

username.send_keys("")
password.send_keys("")

password.submit()

input("Press Enter to close...")
driver.quit()

