from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.forms.models import modelformset_factory
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.cache import never_cache, cache_page

from aimap.models import Issue

def person_all():
    objs = []
    for obj in Issue.objects.all():
        objs.append(obj.get_json())
    
    return u"[%s]"%(",".join(objs))

def person_all_view(request):
    return HttpResponse(person_all())

    
def person_detail_view(request, pk):
    return HttpResponse(Issue.objects.get(pk=pk).get_detail_json())

