from django.contrib import admin
from models import *
from django import forms
from django.contrib.admin import site
from django.contrib.admin.widgets import AdminTextInputWidget
from django.utils.safestring import mark_safe

class AdminMapPickerWidget(AdminTextInputWidget):
    def render(self, name, value, attrs=None):
        return mark_safe(u'<link rel="stylesheet" type="text/css" href="/static/css/leaflet.css" /><div id="map" style="height: 300px; width: 300px"></div>')


class PersonAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(PersonAdminForm, self).__init__(*args, **kwargs)
        self.fields['map_picker'].widget = AdminMapPickerWidget()

class PersonAdmin(admin.ModelAdmin):
    #exclude = ("ascii_first_name", "ascii_last_name", "ascii_issue_name", )
    #readonly_fields = ('map_picker', )
    form = PersonAdminForm
    exclude =  ("ascii_first_name", "ascii_last_name", "ascii_issue_name", )

    class Media:
        js = ["/static/js/jquery-1.7.2.js",
              "/static/js/knockout-2.1.0.debug.js",
              "/static/js/leaflet.js",
              "/static/js/maphelpers.js",
              "/static/js/admin_map_picker.js", ]
        #css = ["/static/css/leaflet.css", ]
      

admin.site.register(Person, PersonAdmin)
admin.site.register(Country)

		 

