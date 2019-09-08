import os





path = os.getcwd()
pathlist = os.listdir(path)
cnt = 0
for i in pathlist:
    if i == "megumin.py": continue
    os.rename(i, str(cnt+1e9)+".png")
    cnt+=1

pathlist = os.listdir(path)
cnt = 0
for i in pathlist:
    if i == "megumin.py": continue
    os.rename(i, str(cnt)+".png")
    cnt+=1