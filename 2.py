from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--headless=new")

driver = webdriver.Chrome(options=options)

driver.get("https://www.google.com/")

print(driver.title)

driver.quit()