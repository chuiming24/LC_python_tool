import sqlite3

conn = sqlite3.connect('数据库.db')
cur = conn.cursor()

# 建表
cur.execute('create table user '
            '(id varchar(20) primary key, name varchar(20), password varchar(20))')
# 插值
cur.execute('INSERT INTO user values("1","April","1234567890")')
# 提交
conn.commit()
# 关闭连接
conn.close()
