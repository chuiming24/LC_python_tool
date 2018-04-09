from bs4 import BeautifulSoup
from urllib.request import urlopen

# if has Chinese, apply decode()
html = urlopen("https://morvanzhou.github.io/static/scraping/basic-structure.html").read().decode('utf-8')

soup = BeautifulSoup(html, features='lxml')

print(soup.h1)
#因为我们真正的 link 不是在 <a> 中间 </a>, 而是在 <a href="link"> 里面, 也可以看做是 <a> 的一个属性. 我们能用像 Python 字典的形式, 用 key 来读取 l["href"].
all_href = soup.find_all('a')
all_href = [l['href'] for l in all_href]        #像字典一样使用
print('\n', all_href)
