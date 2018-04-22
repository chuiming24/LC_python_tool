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
from seach_gui import *
from main_gui import *



if __name__=='__main__':
        
    app = QApplication(sys.argv)

    browser = Mian_Gui()
    browser.show()

    sys.exit(app.exec_())
