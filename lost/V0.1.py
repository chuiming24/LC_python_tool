from tkinter import *
import webbrowser
import pyperclip
import threading as mp
import ctypes
import time


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
        

    def say_hi(self):
        print("hi there, everyone!")
        print(self.input.get())
        webbrowser.open('http://so.szlcsc.com/global.html?c=&k='+self.input.get())

    def say_seach(self, event):
        print("hi there, everyone!")
        print(self.input.get())
        webbrowser.open('http://so.szlcsc.com/global.html?c=&k='+self.input.get())


    def say_newadmin(self):
        webbrowser.open('https://erp.szlcsc.com/#/')


if __name__=='__main__':
    whnd = ctypes.windll.kernel32.GetConsoleWindow()  
    if whnd != 0:  
        ctypes.windll.user32.ShowWindow(whnd, 0)  
        ctypes.windll.kernel32.CloseHandle(whnd)  
    root = Tk()
    app = App(root)

    root.mainloop()
    root.destroy() # optional; see description below
