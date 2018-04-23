# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file '.\main.ui'
#
# Created by: PyQt4 UI code generator 4.11.4
#
# WARNING! All changes made in this file will be lost!

from PyQt4 import QtCore, QtGui
from seach_gui import *

try:
    _fromUtf8 = QtCore.QString.fromUtf8
except AttributeError:
    def _fromUtf8(s):
        return s

try:
    _encoding = QtGui.QApplication.UnicodeUTF8
    def _translate(context, text, disambig):
        return QtGui.QApplication.translate(context, text, disambig, _encoding)
except AttributeError:
    def _translate(context, text, disambig):
        return QtGui.QApplication.translate(context, text, disambig)

class Mian_Gui(QtGui.QWidget):
    def __init__(self, parent = None):
        super(Mian_Gui, self).__init__(parent)
        self.ui = Ui_Form()
        self.ui.setupUi(self)

class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName(_fromUtf8("Form"))
        Form.resize(882, 392)
        self.tableWidget = QtGui.QTableWidget(Form)
        self.tableWidget.setGeometry(QtCore.QRect(30, 50, 811, 271))
        self.tableWidget.setObjectName(_fromUtf8("tableWidget"))
        self.tableWidget.setColumnCount(11)
        self.tableWidget.setRowCount(0)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(0, item)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(1, item)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(2, item)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(3, item)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(4, item)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(5, item)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(6, item)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(7, item)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(8, item)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(9, item)
        item = QtGui.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(10, item)
        self.pushButton_appped_2 = QtGui.QPushButton(Form)
        self.pushButton_appped_2.setGeometry(QtCore.QRect(720, 340, 93, 28))
        self.pushButton_appped_2.setObjectName(_fromUtf8("pushButton_appped_2"))
        self.pushButton_appped = QtGui.QPushButton(Form)
        self.pushButton_appped.setGeometry(QtCore.QRect(600, 340, 101, 31))
        self.pushButton_appped.setObjectName(_fromUtf8("pushButton_appped"))

        self.seach_gui_windows = Seach_Gui() 
        
        self.retranslateUi(Form)
        self.createConnection(Form)        
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        Form.setWindowTitle(_translate("Form", "客户投诉记录", None))
        item = self.tableWidget.horizontalHeaderItem(0)
        item.setText(_translate("Form", "已经解决", None))
        item = self.tableWidget.horizontalHeaderItem(1)
        item.setText(_translate("Form", "今日解决", None))
        item = self.tableWidget.horizontalHeaderItem(2)
        item.setText(_translate("Form", "客户编号", None))
        item = self.tableWidget.horizontalHeaderItem(3)
        item.setText(_translate("Form", "客户等级", None))
        item = self.tableWidget.horizontalHeaderItem(4)
        item.setText(_translate("Form", "客户称呼", None))
        item = self.tableWidget.horizontalHeaderItem(5)
        item.setText(_translate("Form", "投诉商品", None))
        item = self.tableWidget.horizontalHeaderItem(6)
        item.setText(_translate("Form", "购买数量", None))
        item = self.tableWidget.horizontalHeaderItem(7)
        item.setText(_translate("Form", "购买次数", None))
        item = self.tableWidget.horizontalHeaderItem(8)
        item.setText(_translate("Form", "新建列", None))
        item = self.tableWidget.horizontalHeaderItem(9)
        item.setText(_translate("Form", "投诉内容", None))
        self.pushButton_appped_2.setText(_translate("Form", "查看", None))
        self.pushButton_appped.setText(_translate("Form", "增加", None))


    def createConnection(self, Form):
        Form.connect(self.pushButton_appped_2, QtCore.SIGNAL('clicked()'), self.search)
        Form.connect(self.pushButton_appped, QtCore.SIGNAL('clicked()'), self.addDat)
        
    def search(self):
        self.seach_gui_windows.setInit()
        self.seach_gui_windows.show()
        
        print("获取到了")

    def addDat(self):
        self.tableWidget.setHorizontalHeaderLabels(['SUN','MON','TUE','WED',  'THU','FIR','SAT'])
        
