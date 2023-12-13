from bs4 import BeautifulSoup
import requests as req
import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

#get data from http://localhost:9000
url = "http://localhost:9000/questions"
def fetch(url):
    res = req.get(url)
    data = res.json()
    return data

driver = webdriver.Chrome()
driver.get("http://localhost:3000/")
driver.maximize_window()


btn_start = driver.find_element( By.CLASS_NAME ,"start-btn")
# time.sleep(2)
btn_start.click()
time.sleep(2)


usernam = driver.find_element(By.TAG_NAME , "input")
usernam.send_keys("omar")

time.sleep(2)

login = driver.find_element(By.CLASS_NAME , "btn-login")
login.click()




data = fetch(url)

for i in range(len(data)):
    question = driver.find_element(By.CLASS_NAME , "title").text.strip()
    print(question)
    if data[i]["question"] == question:
        correct_answer = data[i]["correctOption"] 
        print(correct_answer)
        child_elements = driver.find_elements(By.TAG_NAME, "li")
        correct_answer = child_elements[correct_answer]
        print(correct_answer)
        correct_answer.click()

        next_btn = driver.find_element(By.XPATH , f"/html/body/div/div/main/div/div[3]/button")

        next_btn.click()
        time.sleep(2)

time.sleep(3)
driver.close()