from app.aimap.models import *
import datetime
import time
def load():
    import app
    i = 0
    f = file("/home/sika/data2.csv", "r")
    for line in f.read().split("\n"):
        i += 1
        if i == 10: break
        try:
            d = line.split(";")
            a = d[6].split(" ")
            dd = "%s-%s-%s"%(a[2], time.strptime(a[1], "%b").tm_mon, a[0])
            print d[1]
            obj = Person(issue_name=d[3],
                         description=d[4],
                         country=d[0],
                         ai_library=d[5],
                         lat=float(d[1]),
                         lon=float(d[2]),
                         issue_date=dd
                         )
            obj.save()
        except ValueError:
            pass
                        
def lw(request):
    load()
    return 0
    
def d(request):
    for x in Person.objects.all():
        x.delete()
    return 0
