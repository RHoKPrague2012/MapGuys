from django.contrib import admin
from models import *
from django import forms
from django.contrib.admin import site
from django.contrib.admin.widgets import AdminTextInputWidget
from django.utils.safestring import mark_safe

class AdminMapPickerWidget(AdminTextInputWidget):
    def render(self, name, value, attrs=None):
        return mark_safe(u'<link rel="stylesheet" type="text/css" href="/static/css/leaflet.css" /><div id="map" style="height: 300px; width: 300px"></div>')


class IssueAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(IssueAdminForm, self).__init__(*args, **kwargs)
        self.fields['map_picker'].widget = AdminMapPickerWidget()

class IssueAdmin(admin.ModelAdmin):
    form = IssueAdminForm
    exclude =  ("ascii_issue_name", )

    class Media:
        js = ["/static/js/jquery-1.7.2.js",
              "/static/js/knockout-2.1.0.debug.js",
              "/static/js/leaflet.js",
              "/static/js/maphelpers.js",
              "/static/js/admin_map_picker.js", ]
        #css = ["/static/css/leaflet.css", ]
      
admin.site.register(Issue, IssueAdmin)
admin.site.register(Marker)
admin.site.register(Category)

		 

