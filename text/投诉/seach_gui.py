# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file '.\seach.ui'
#
# Created by: PyQt4 UI code generator 4.11.4
#
# WARNING! All changes made in this file will be lost!

from PyQt4 import QtCore, QtGui

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

class Seach_Gui(QtGui.QWidget):
    def __init__(self, parent = None):
        super(Seach_Gui, self).__init__(parent)
        self.ui = Ui_Form()
        self.ui.setupUi(self)

    def setInit(self):
        self.ui.search()

class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName(_fromUtf8("Form"))
        Form.resize(1037, 331)
        self.pushButton = QtGui.QPushButton(Form)
        self.pushButton.setGeometry(QtCore.QRect(850, 290, 140, 28))
        self.pushButton.setObjectName(_fromUtf8("pushButton"))
        self.layoutWidget = QtGui.QWidget(Form)
        self.layoutWidget.setGeometry(QtCore.QRect(40, 10, 280, 261))
        self.layoutWidget.setObjectName(_fromUtf8("layoutWidget"))
        self.verticalLayout = QtGui.QVBoxLayout(self.layoutWidget)
        self.verticalLayout.setObjectName(_fromUtf8("verticalLayout"))
        self.horizontalLayout = QtGui.QHBoxLayout()
        self.horizontalLayout.setObjectName(_fromUtf8("horizontalLayout"))
        self.label_CostomerNumber = QtGui.QLabel(self.layoutWidget)
        self.label_CostomerNumber.setObjectName(_fromUtf8("label_CostomerNumber"))
        self.horizontalLayout.addWidget(self.label_CostomerNumber)
        self.lineEdit_CostomerNumber = QtGui.QLineEdit(self.layoutWidget)
        self.lineEdit_CostomerNumber.setObjectName(_fromUtf8("lineEdit_CostomerNumber"))
        self.horizontalLayout.addWidget(self.lineEdit_CostomerNumber)
        self.verticalLayout.addLayout(self.horizontalLayout)
        self.horizontalLayout_2 = QtGui.QHBoxLayout()
        self.horizontalLayout_2.setObjectName(_fromUtf8("horizontalLayout_2"))
        self.label_CostomerLsevel = QtGui.QLabel(self.layoutWidget)
        self.label_CostomerLsevel.setObjectName(_fromUtf8("label_CostomerLsevel"))
        self.horizontalLayout_2.addWidget(self.label_CostomerLsevel)
        self.comboBox_CostormerLevel = QtGui.QComboBox(self.layoutWidget)
        self.comboBox_CostormerLevel.setObjectName(_fromUtf8("comboBox_CostormerLevel"))
        self.comboBox_CostormerLevel.addItem(_fromUtf8(""))
        self.comboBox_CostormerLevel.addItem(_fromUtf8(""))
        self.comboBox_CostormerLevel.addItem(_fromUtf8(""))
        self.comboBox_CostormerLevel.addItem(_fromUtf8(""))
        self.comboBox_CostormerLevel.addItem(_fromUtf8(""))
        self.horizontalLayout_2.addWidget(self.comboBox_CostormerLevel)
        self.verticalLayout.addLayout(self.horizontalLayout_2)
        self.horizontalLayout_3 = QtGui.QHBoxLayout()
        self.horizontalLayout_3.setObjectName(_fromUtf8("horizontalLayout_3"))
        self.label_CostomerName = QtGui.QLabel(self.layoutWidget)
        self.label_CostomerName.setObjectName(_fromUtf8("label_CostomerName"))
        self.horizontalLayout_3.addWidget(self.label_CostomerName)
        self.lineEdit_CostomerName = QtGui.QLineEdit(self.layoutWidget)
        self.lineEdit_CostomerName.setObjectName(_fromUtf8("lineEdit_CostomerName"))
        self.horizontalLayout_3.addWidget(self.lineEdit_CostomerName)
        self.verticalLayout.addLayout(self.horizontalLayout_3)
        self.horizontalLayout_4 = QtGui.QHBoxLayout()
        self.horizontalLayout_4.setObjectName(_fromUtf8("horizontalLayout_4"))
        self.label_ComplainsGood = QtGui.QLabel(self.layoutWidget)
        self.label_ComplainsGood.setObjectName(_fromUtf8("label_ComplainsGood"))
        self.horizontalLayout_4.addWidget(self.label_ComplainsGood)
        self.lineEdit_ComplainsGoods = QtGui.QLineEdit(self.layoutWidget)
        self.lineEdit_ComplainsGoods.setObjectName(_fromUtf8("lineEdit_ComplainsGoods"))
        self.horizontalLayout_4.addWidget(self.lineEdit_ComplainsGoods)
        self.verticalLayout.addLayout(self.horizontalLayout_4)
        self.horizontalLayout_5 = QtGui.QHBoxLayout()
        self.horizontalLayout_5.setObjectName(_fromUtf8("horizontalLayout_5"))
        self.label_Quantity = QtGui.QLabel(self.layoutWidget)
        self.label_Quantity.setObjectName(_fromUtf8("label_Quantity"))
        self.horizontalLayout_5.addWidget(self.label_Quantity)
        self.lineEdit_Quantity = QtGui.QLineEdit(self.layoutWidget)
        self.lineEdit_Quantity.setObjectName(_fromUtf8("lineEdit_Quantity"))
        self.horizontalLayout_5.addWidget(self.lineEdit_Quantity)
        self.verticalLayout.addLayout(self.horizontalLayout_5)
        self.horizontalLayout_6 = QtGui.QHBoxLayout()
        self.horizontalLayout_6.setObjectName(_fromUtf8("horizontalLayout_6"))
        self.label_PurchaseTimes = QtGui.QLabel(self.layoutWidget)
        self.label_PurchaseTimes.setObjectName(_fromUtf8("label_PurchaseTimes"))
        self.horizontalLayout_6.addWidget(self.label_PurchaseTimes)
        self.lineEdit_PurchaseTimes = QtGui.QLineEdit(self.layoutWidget)
        self.lineEdit_PurchaseTimes.setObjectName(_fromUtf8("lineEdit_PurchaseTimes"))
        self.horizontalLayout_6.addWidget(self.lineEdit_PurchaseTimes)
        self.verticalLayout.addLayout(self.horizontalLayout_6)
        self.horizontalLayout_7 = QtGui.QHBoxLayout()
        self.horizontalLayout_7.setObjectName(_fromUtf8("horizontalLayout_7"))
        self.label_GoodsBusiness = QtGui.QLabel(self.layoutWidget)
        self.label_GoodsBusiness.setObjectName(_fromUtf8("label_GoodsBusiness"))
        self.horizontalLayout_7.addWidget(self.label_GoodsBusiness)
        self.lineEdit_GoodsBusiness = QtGui.QLineEdit(self.layoutWidget)
        self.lineEdit_GoodsBusiness.setObjectName(_fromUtf8("lineEdit_GoodsBusiness"))
        self.horizontalLayout_7.addWidget(self.lineEdit_GoodsBusiness)
        self.verticalLayout.addLayout(self.horizontalLayout_7)
        self.layoutWidget_2 = QtGui.QWidget(Form)
        self.layoutWidget_2.setGeometry(QtCore.QRect(90, 280, 731, 41))
        self.layoutWidget_2.setObjectName(_fromUtf8("layoutWidget_2"))
        self.horizontalLayout_10 = QtGui.QHBoxLayout(self.layoutWidget_2)
        self.horizontalLayout_10.setObjectName(_fromUtf8("horizontalLayout_10"))
        self.horizontalLayout_9 = QtGui.QHBoxLayout()
        self.horizontalLayout_9.setObjectName(_fromUtf8("horizontalLayout_9"))
        self.label_7 = QtGui.QLabel(self.layoutWidget_2)
        self.label_7.setObjectName(_fromUtf8("label_7"))
        self.horizontalLayout_9.addWidget(self.label_7)
        self.comboBox_TodayStats = QtGui.QComboBox(self.layoutWidget_2)
        self.comboBox_TodayStats.setObjectName(_fromUtf8("comboBox_TodayStats"))
        self.comboBox_TodayStats.addItem(_fromUtf8(""))
        self.comboBox_TodayStats.addItem(_fromUtf8(""))
        self.horizontalLayout_9.addWidget(self.comboBox_TodayStats)
        self.label_8 = QtGui.QLabel(self.layoutWidget_2)
        self.label_8.setObjectName(_fromUtf8("label_8"))
        self.horizontalLayout_9.addWidget(self.label_8)
        self.comboBox_Stats = QtGui.QComboBox(self.layoutWidget_2)
        self.comboBox_Stats.setObjectName(_fromUtf8("comboBox_Stats"))
        self.comboBox_Stats.addItem(_fromUtf8(""))
        self.comboBox_Stats.addItem(_fromUtf8(""))
        self.horizontalLayout_9.addWidget(self.comboBox_Stats)
        self.horizontalLayout_10.addLayout(self.horizontalLayout_9)
        self.layoutWidget_3 = QtGui.QWidget(Form)
        self.layoutWidget_3.setGeometry(QtCore.QRect(330, 10, 671, 261))
        self.layoutWidget_3.setObjectName(_fromUtf8("layoutWidget_3"))
        self.horizontalLayout_8 = QtGui.QHBoxLayout(self.layoutWidget_3)
        self.horizontalLayout_8.setObjectName(_fromUtf8("horizontalLayout_8"))
        self.groupBox = QtGui.QGroupBox(self.layoutWidget_3)
        self.groupBox.setObjectName(_fromUtf8("groupBox"))
        self.textEdit_ComplainsDetails = QtGui.QTextEdit(self.groupBox)
        self.textEdit_ComplainsDetails.setGeometry(QtCore.QRect(10, 20, 201, 221))
        self.textEdit_ComplainsDetails.setObjectName(_fromUtf8("textEdit_ComplainsDetails"))
        self.horizontalLayout_8.addWidget(self.groupBox)
        self.groupBox_2 = QtGui.QGroupBox(self.layoutWidget_3)
        self.groupBox_2.setObjectName(_fromUtf8("groupBox_2"))
        self.textEdit_Evolve = QtGui.QTextEdit(self.groupBox_2)
        self.textEdit_Evolve.setGeometry(QtCore.QRect(10, 20, 201, 221))
        self.textEdit_Evolve.setObjectName(_fromUtf8("textEdit_Evolve"))
        self.horizontalLayout_8.addWidget(self.groupBox_2)
        self.groupBox_3 = QtGui.QGroupBox(self.layoutWidget_3)
        self.groupBox_3.setObjectName(_fromUtf8("groupBox_3"))
        self.textEdit_Situation = QtGui.QTextEdit(self.groupBox_3)
        self.textEdit_Situation.setGeometry(QtCore.QRect(10, 20, 201, 221))
        self.textEdit_Situation.setObjectName(_fromUtf8("textEdit_Situation"))
        self.horizontalLayout_8.addWidget(self.groupBox_3)

        self.retranslateUi(Form)
        self.createConnection(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        Form.setWindowTitle(_translate("Form", "投诉情况", None))
        self.pushButton.setText(_translate("Form", "储存", None))
        self.label_CostomerNumber.setText(_translate("Form", "客户编号", None))
        self.label_CostomerLsevel.setText(_translate("Form", "客户等级", None))
        self.comboBox_CostormerLevel.setItemText(0, _translate("Form", "铜牌会员", None))
        self.comboBox_CostormerLevel.setItemText(1, _translate("Form", "银牌会员", None))
        self.comboBox_CostormerLevel.setItemText(2, _translate("Form", "金牌会员", None))
        self.comboBox_CostormerLevel.setItemText(3, _translate("Form", "钻石会员", None))
        self.comboBox_CostormerLevel.setItemText(4, _translate("Form", "皇冠会员", None))
        self.label_CostomerName.setText(_translate("Form", "客户称呼", None))
        self.label_ComplainsGood.setText(_translate("Form", "投诉商品", None))
        self.label_Quantity.setText(_translate("Form", "购买数量", None))
        self.label_PurchaseTimes.setText(_translate("Form", "购买次数", None))
        self.label_GoodsBusiness.setText(_translate("Form", "对应商家", None))
        self.label_7.setText(_translate("Form", "今日是否解决", None))
        self.comboBox_TodayStats.setItemText(0, _translate("Form", "是", None))
        self.comboBox_TodayStats.setItemText(1, _translate("Form", "否", None))
        self.label_8.setText(_translate("Form", "是否完全解决", None))
        self.comboBox_Stats.setItemText(0, _translate("Form", "是", None))
        self.comboBox_Stats.setItemText(1, _translate("Form", "否", None))
        self.groupBox.setTitle(_translate("Form", "客户投诉内容", None))
        self.groupBox_2.setTitle(_translate("Form", "询问进展", None))
        self.groupBox_3.setTitle(_translate("Form", "情况判断", None))

    def createConnection(self, Form):
        Form.connect(self.pushButton, QtCore.SIGNAL('clicked()'), self.search)

    def search(self):
        print("更新数据")

