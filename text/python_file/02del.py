#删除WIN7下自启动的py的cmd文件
import os,sys
import getpass

pwd = os.path.split(os.path.realpath(__file__))[0]
name = getpass.getuser()
print(pwd)
print(name)
name = '\\'+name
try:
    os.remove(r'C:\Users'+name+r'\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup'+r'\test.cmd')
    print("删除成功")
except:
    print("删除失败")
