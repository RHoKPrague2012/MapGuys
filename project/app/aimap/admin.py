from django.contrib import admin
from models import *

class PersonAdmin(admin.ModelAdmin):
    exclude = ("ascii_first_name", "ascii_last_name", "ascii_issue_name", )
    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.owner = request.user
        obj.save()


admin.site.register(Person, PersonAdmin)
admin.site.register(Country)

		 

