import sqlite3

conn = sqlite3.connect("数据库.db")
cur = conn.cursor()

name = 'April'
# SQL语句中使用Python程序中的变量时
# Never do this -- insecure!
#cur.execute("SELECT * FROM user WHERE name = '%s'" % name)

# Do this instead
t = ('April',)
cur.execute('SELECT * FROM user WHERE name=?', t)
print(cur.fetchone())
# 用for循环获取execute()查找返回的结果【还有fetchone()/fetchall()等方法】
for row in cur.execute('select * from user'):
    print(row)
cur.execute('select "name","password" from user where id=?', ('1',))
print(cur.fetchall())
print(cur.rowcount) # rowcount表示上一操作影响的行数,-1表示该游标未执行语句或者接口未确定最后一个操作的行数

try:
    # Larger example that inserts many records at a time
    users = [('2', 'A', '0000'),
                 ('3', 'B', '3333'),
                 ('4', 'C', '4444'),
                ]
    cur.executemany('INSERT INTO user VALUES (?,?,?)', users)
except sqlite3.IntegrityError as e:
    print('插入失败:',e)
finally:
    conn.commit()
    conn.close()
