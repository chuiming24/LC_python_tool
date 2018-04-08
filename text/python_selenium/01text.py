from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time

driver = webdriver.Chrome()
driver.maximize_window() 
driver.get("http://list.szlcsc.com/catalog/582.html")
#assert "Python" in driver.title
#elem = driver.find_element_by_name("q")
#elem.send_keys("pycon")
#elem.send_keys(Keys.RETURN)
html = driver.page_source
soup = BeautifulSoup(html, features='lxml')
for link in soup.find_all('a'):
    all_href = link.get('href')
    if(type(all_href) == str):
        if 'item' in all_href:
            print(all_href)
# 滚动条置底  
js1 = "var q=document.documentElement.scrollTop=1000000"  
driver.execute_script(js1)  
#driver.find_element_by_class_name("next").click()
#time.sleep(5)
#driver.implicitly_wait(30)
#driver.find_element_by_class_name("next").click()
#https://www.cnblogs.com/BigFishFly/p/6380024.html
#https://blog.csdn.net/liuchunming033/article/details/46789085

#driver.close()
