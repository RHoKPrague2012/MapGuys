from django.conf.urls.defaults import patterns, include, url 
from django.views.generic.simple import direct_to_template
 

urlpatterns = patterns('',
    url(r'^$',
        "aimap.views.home",
        {"template": "aimap/home.html", },
        name="aimap.home"),
    url(r'^detail/(?P<pk>\d+)$',
        "aimap.views.detail",
        {"template": "aimap/detail.html", },
        name="aimap.detail"),
 
    url(r'json/person_all.json$',
        "aimap.json.person_all_view",
        name="aimap.json.person_all"),
    url(r'json/person_(?P<pk>\d+).json$',
        "aimap.json.person_detail_view",
        name="aimap.json.person_detail"),
        
    url(r'load$',
        "aimap.helpers.lw",
        name="ss.person_all"),
    url(r'del$',
        "aimap.helpers.d",
        name="ss.persosssn_all"),
)
