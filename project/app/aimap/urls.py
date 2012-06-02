from django.conf.urls.defaults import patterns, include, url 
from django.views.generic.simple import direct_to_template
 

urlpatterns = patterns('',
    url(r'^$',
        "aimap.views.home",
        {"template": "aimap/home.html", },
        name="aimap.home"),
    url(r'^(?P<pk>\d+)$',
        "aimap.views.detail",
        {"template": "aimap/detail.html", },
        name="aimap.detail"),
)
