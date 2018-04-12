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

#https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyqt4
#https://segmentfault.com/a/1190000005165656
from PyQt4.QtCore import *
from PyQt4.QtGui import *
from PyQt4.QtWebKit import *


class MyBrowser(QWidget):

    def __init__(self, parent = None):
        super(MyBrowser, self).__init__(parent)
        self.createLayout()
        self.createConnection()

    def say_codehtml(self, getkey, webnum, openpdf = 0):
        self.flag = True
        count = 0;
        urlf = ''
        url = 'http://so.szlcsc.com/global.html?c=&k='+getkey
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
            pass
        elif(openpdf == 0):
            urlf = QUrl(urlf)
            if (webnum == 0):
                self.webView1.load(urlf)
            else:
                self.webView2.load(urlf)
        else:
            self.get_pdf(urlf)
            
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

    def search(self):
        address = str(self.addressBar.text())
        if address:
            #if address.find('://') == -1:
            #    address = 'http://' + address
            address = address.split()
            print(address)
            self.say_codehtml(address[0], 0)
            self.say_codehtml(address[1], 1)
            
    def searchpdf(self):
        address = str(self.addressBar.text())
        if address:
            #if address.find('://') == -1:
            #    address = 'http://' + address
            address = address.split()
            print(address)
            self.say_codehtml(address[0], 0, 1)
            self.say_codehtml(address[1], 1, 1)
            

    def createLayout(self):
        self.setWindowTitle("keakon's browser")

        self.addressBar = QLineEdit()
        self.goButton1 = QPushButton("&打开网页")
        self.goButton2 = QPushButton("&打开pdf")
        self.webView1 = QWebView()
        self.webView2 = QWebView()

        #创建plot布局
        layout = QGridLayout()

        #将控件添加到布局中
        layout.addWidget(self.addressBar, 0, 0, 1, 18)
        layout.addWidget(self.goButton1, 0, 19, 1, 1)
        layout.addWidget(self.goButton2, 0, 20, 1, 1)
        layout.addWidget(self.webView1, 1, 0, 5, 10)
        layout.addWidget(self.webView2, 1, 10, 5, 20)

        self.setLayout(layout)

    def createConnection(self):
        self.connect(self.addressBar, SIGNAL('returnPressed()'), self.search)
        self.connect(self.addressBar, SIGNAL('returnPressed()'), self.addressBar, SLOT('selectAll()'))
        self.connect(self.goButton1, SIGNAL('clicked()'), self.search)
        self.connect(self.goButton1, SIGNAL('clicked()'), self.addressBar, SLOT('selectAll()'))
        self.connect(self.goButton2, SIGNAL('clicked()'), self.searchpdf)
        self.connect(self.goButton2, SIGNAL('clicked()'), self.addressBar, SLOT('selectAll()'))

'''
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
        
'''        
        

if __name__=='__main__':
    '''
    whnd = ctypes.windll.kernel32.GetConsoleWindow()  
    if whnd != 0:  
        ctypes.windll.user32.ShowWindow(whnd, 0)  
        ctypes.windll.kernel32.CloseHandle(whnd)  
    root = Tk()
    app = App(root)

    root.mainloop()
    root.destroy() # optional; see description below
    '''

    app = QApplication(sys.argv)

    browser = MyBrowser()
    browser.show()

    sys.exit(app.exec_())
