from app.aimap.models import *
import datetime
def load():
    import app
    i = 0
    f = file("/home/sika/data2.csv", "r")
    for line in f.read().split("\n"):
        i += 1
        #if i == 10: break
        try:
            d = line.split(";")
            print d[1]
            obj = Person(issue_name=d[3],
                         description=d[4],
                         ai_library=d[5],
                         lat=float(d[1]),
                         lon=float(d[2]),
                         issue_date=datetime.date.today()
                         )
            obj.save()
        except:
            pass
                        
def lw(request):
    load()
    return 0
    
def d(request):
    for x in Person.objects.all():
        x.delete()
    return 0
