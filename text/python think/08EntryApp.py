from tkinter import *
import webbrowser
import pyperclip


#获取剪切板内容
def gettext():
    return pyperclip.paste()

class App:

    def __init__(self, master):

        frame = Frame(master)
        frame.pack()


        self.input = Entry(frame)
        self.input.pack(side=TOP)
        
        self.button = Button(
            frame, text="退出", fg="red", command=frame.quit
            )
        self.button.pack(side=LEFT)

        self.hi_there = Button(frame, text="查找商品", command=self.say_hi)
        self.hi_there.pack(side=LEFT)

    def say_hi(self):
        print("hi there, everyone!")
        print(self.input.get())
        #webbrowser.open('http://so.szlcsc.com/global.html?c=&k='+self.input.get())
        getText = gettext()
        if(getText[0] == 'C'):
            webbrowser.open('http://so.szlcsc.com/global.html?c=&k='+getText)

loatText = ''
while(True):
    getText = gettext()
    if(len(getText) != 0 and loatText != getText and (getText[0] == 'C' or getText[0] == 'C' )):
        loatText = getText
        webbrowser.open('http://so.szlcsc.com/global.html?c=&k='+getText)
    
root = Tk()

app = App(root)

root.mainloop()
root.destroy() # optional; see description below
