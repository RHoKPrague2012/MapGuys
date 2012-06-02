from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.forms.models import modelformset_factory
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.cache import never_cache, cache_page


def home(request, template):
    return HttpResponse("home")

def detail(request, pk, template):
    return HttpResponse("detail %s"%pk)
