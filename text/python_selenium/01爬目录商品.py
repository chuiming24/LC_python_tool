##可以爬下目录下商品的地址，3秒一页

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import pyautogui
import os



#商品目录地址
con_index = 'http://list.szlcsc.com/catalog/582.html'
#商品目录一共几页
index_num = 2

txtName = "codingWord.txt"
f=open(txtName, "a+")

driver = webdriver.Chrome()
driver.maximize_window()
#目录列表
driver.get(con_index)
#assert "Python" in driver.title
#elem = driver.find_element_by_name("q")
#elem.send_keys("pycon")
#elem.send_keys(Keys.RETURN)

#增加列表


for i in range(index_num):
    get_link = []

    print('第'+str(i)+'页')
    html = driver.page_source
    soup = BeautifulSoup(html, features='lxml')
    for link in soup.find_all('a'):
        flag = True
        all_href = link.get('href')
        if(type(all_href) == str):
            if 'item' in all_href:
                if 'similar' in all_href:
                    continue
                for put in get_link:
                    if all_href == put:
                        flag = False
                        break
                if(flag):
                    get_link.append(all_href)
    print(get_link)
    for put in get_link:
        new_context = put + '\n'
        f.write(new_context)
    # 滚动条置底  
    js1 = "var q=document.documentElement.scrollTop=1000000"  
    driver.execute_script(js1)
    pyautogui.click(1530,367,button='left')  ####在相应位置点击鼠标左键
    time.sleep(3)

            


#driver.find_element_by_class_name("next").click()
#driver.implicitly_wait(30)
#driver.find_element_by_class_name("next").click()
#https://www.cnblogs.com/BigFishFly/p/6380024.html
#https://blog.csdn.net/liuchunming033/article/details/46789085

f.close()
driver.close()
