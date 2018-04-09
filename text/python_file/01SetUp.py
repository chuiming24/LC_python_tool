#生成一个可以启动当前py的cmd文件
import os,sys
import getpass

pwd = os.path.split(os.path.realpath(__file__))[0]
name = getpass.getuser()
print(pwd)
print(name)
name = '\\'+name
f = open(r'C:\Users'+name+r'\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup'+r'\test.cmd', 'w')
f.write('cd '+ pwd+'\n')
f.write('python text.py\n')
f.write('pause')
f.close
