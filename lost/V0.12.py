# -*- coding: utf-8 -*- 
from tkinter import *
import webbrowser
import pyperclip
import threading as mp
import ctypes
import time
from bs4 import BeautifulSoup
import requests
import re
import json



#获取剪切板内容
def gettext():
    return pyperclip.paste()



def getTextb(a):
    print("剪切板监督中")
    loatText = ''
    while(True):
        #getText = gettext()
        sleep(0.2)
        if(len(getText) != 0 and loatText != getText and (getText[0] == 'C' or getText[0] == 'C' )):
            sleep(0.2)
            loatText = getText
            webbrowser.open('http://so.szlcsc.com/global.html?c=&k='+getText)
    


class App:

    def __init__(self, master):
        master.withdraw()
        Popup = Toplevel(master)
        #Popup.resizable(0,0)
        #Popup.attributes("-toolwindow", 1)
        Popup.wm_attributes("-topmost", 1)

        Popup.overrideredirect(True)
        frame = Frame(Popup)
        frame.pack()

        #self.p1 = mp.Thread(target = getTextb, args = (1,))

        self.flag = True

        self.input = Entry(frame)
        self.input.pack(side=TOP)
        self.input.bind('<Key-Return>', self.say_seach)
        
        self.button = Button(
            frame, text="退出", fg="red", command=frame.quit
            )
        self.button.pack(side=LEFT)

        self.hi_there = Button(frame, text="查找商品", command=self.say_hi)
        self.hi_there.pack(side=LEFT)

        #self.hi_there = Button(frame, text="监督剪切板", command=self.p1.start())
        #self.hi_there.pack(side=LEFT)
        
        self.hi_there = Button(frame, text="新后台", command=self.say_newadmin)
        self.hi_there.pack(side=LEFT)
        
        self.hi_there = Button(frame, text="编号网页", command=self.say_codehtml)
        self.hi_there.pack(side=LEFT)

    def get_pdf(self, url):
        r = requests.get(url)
        html = r.text
        soup = BeautifulSoup(html, features='lxml')
        
        all_href = ''
        link = soup.find_all('span', attrs={'id':'downloadFile'})
        print(link)
        for i in link:
            getid = i.get('param-click')

        url = r'http://www.szlcsc.com/order/OrderCommonAction!selectProductPDFAndPCBListJsonp.action?callback=%27loadFilePDFData%27&annexNumber='+getid+'&callback=jQuery183014143773355556677_1522834983842&_=1522835034347'
        r = requests.get(url)
        html = r.content.decode()[61:-1]
        html = json.loads(html)
        html = html['fileList'][0]
        print(html['annexNumber'])
        webbrowser.open(r'http://www.szlcsc.com/product/pdf/A_' + html['annexNumber'] + r'.PDF')
        

    def say_hi(self):
        print("hi there, everyone!")
        print(self.input.get())
        webbrowser.open('http://so.szlcsc.com/global.html?c=&k='+self.input.get())

    def say_seach(self, event):
        self.say_codehtml()


    def say_newadmin(self):
        webbrowser.open('https://erp.szlcsc.com/#/')

    def say_codehtml(self):
        self.flag = True
        count = 0;
        urlf = ''
        url = 'http://so.szlcsc.com/global.html?c=&k='+self.input.get()
        r = requests.get(url)
        html = r.text
        #html = urlopen(url).read().decode('gbk')
        soup = BeautifulSoup(html, features='lxml')
        
        all_href = ''
        for link in soup.find_all('a'):
            all_href = link.get('href')
            if(type(all_href) == str):
                if 'item' in all_href:
                    urlf = all_href
                    
                    print(all_href)
                    self.flag = False
                    break
                
        for link in soup.find_all('a'):
            all_href = link.get('href')                
            if(type(all_href) == str):
                if 'item' in all_href:
                    count = count + 1                
                if(count > 4):
                    self.flag = True
                    break
            
        if(self.flag):     
            self.say_hi()
            print(self.input.get())
        else:
            webbrowser.open(urlf)
            self.get_pdf(urlf)
        
        
        

if __name__=='__main__':
    
    whnd = ctypes.windll.kernel32.GetConsoleWindow()  
    if whnd != 0:  
        ctypes.windll.user32.ShowWindow(whnd, 0)  
        ctypes.windll.kernel32.CloseHandle(whnd)  
    root = Tk()
    app = App(root)

    root.mainloop()
    root.destroy() # optional; see description below
