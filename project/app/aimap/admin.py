from django.contrib import admin
from models import *
from django import forms
from django.contrib.admin import site
from django.contrib.admin.widgets import AdminTextInputWidget
from django.utils.safestring import mark_safe

class AdminMapPickerWidget(AdminTextInputWidget):
    def render(self, name, value, attrs=None):
        return mark_safe(u'<b>Hello world!</b>')


class PersonAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(PersonAdminForm, self).__init__(*args, **kwargs)
        self.fields['map_picker'].widget = AdminMapPickerWidget()

class PersonAdmin(admin.ModelAdmin):
    #exclude = ("ascii_first_name", "ascii_last_name", "ascii_issue_name", )
    #readonly_fields = ('map_picker', )
    form = PersonAdminForm

admin.site.register(Person, PersonAdmin)
admin.site.register(Country)

		 

