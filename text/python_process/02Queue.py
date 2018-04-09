import multiprocessing as mp

def job(output):
    res = 0
    for i in range(1000):
        res+=i+i**2+i**3
    output.put(res)

if __name__=='__main__':
    output = mp.Queue()
    p1 = mp.Process(target = job, args = (output,))
    p2 = mp.Process(target = job, args = (output,))

    p1.start()
    p2.start()

    p1.join()
    p2.join()

    res1 = output.get()
    res2 = output.get()

    print(res1)
    print(res2)
