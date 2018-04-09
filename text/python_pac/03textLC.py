from bs4 import BeautifulSoup
from urllib.request import urlopen
import re

# if has Chinese, apply decode()
html = urlopen("http://so.szlcsc.com/global.html?c=&k=C90040").read().decode('utf-8')

soup = BeautifulSoup(html, features='lxml')


#print(soup)
#all_href = soup.find_all('a')
all_href = ''
for link in soup.find_all('a'):
    all_href = link.get('href')
    if(type(all_href) == str):
        if 'item' in all_href:
            print(all_href)
            break
#print('\n', all_href)
