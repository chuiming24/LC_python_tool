filename = '商店所有品牌-证书软件完善用-勿动.txt' # txt文件和当前脚本在同一目录下，所以不用写具体路径
inputname = '格式化后的品牌.txt'
pos = []
Efield = []

f = open(inputname, 'w')
with open(filename, 'r') as file_to_read:
    while True:
        lines = file_to_read.readline() # 整行读取数据
        if not lines:
            break
        output = lines.split()
        f.write(output[0]+'\n')
        print(output[0])



