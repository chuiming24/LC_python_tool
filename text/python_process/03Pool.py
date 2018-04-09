import multiprocessing as mp

def job(x):
    return x*x

def multicore():
    pool = mp.Pool(processes = 3) #定义核心为3
    res = pool.map(job, range(10))
    print(res)

if __name__ == '__main__':
    multicore()
