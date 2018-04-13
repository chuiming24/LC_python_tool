import sys
from PyQt5.QtWidgets import QApplication, QWidget
#pip3 install PyQt5
#pip3 install PyQt5-tools
#pip3 install QScintilla

if __name__ == '__main__':

    app = QApplication(sys.argv)
#sys.argv是一组命令行参数的列表。Python可以在shell里运行，
#这个参数提供#对脚本控制的功能。
    w = QWidget()
#QWidget空间是一个用户界面的基本空间，它提供了基本的应用构造器。
#默认情况下，构造器是没有父级的，没有父级的构造器被称为窗口（window）。
    w.resize(250, 150)
#resize()方法能改变控件的大小，这里的意思是窗口宽250px，高150px。
    w.move(300, 300)
#move()是修改控件位置的的方法。它把控件放置到屏幕坐标的(300, 300)的位置。
    w.setWindowTitle('Simple')
    w.show()
#show()能让控件在桌面上显示出来。控件在内存里创建，之后才能在显示器上显示出来。
    sys.exit(app.exec_())
#sys.exit()方法能确保主循环安全退出。外部环境能通知主控件怎么结束。
