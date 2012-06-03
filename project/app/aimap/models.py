from django.db import models

from django.contrib.auth.models import User
#from django.contrib.gis.db import models
from django.core.validators import RegexValidator
from django.utils.translation import ugettext_lazy as _
from aimap.util import unicode2ascii


class Person(models.Model):
    """A person, a prisoner."""

    SEX_MALE = 1
    SEX_FEMALE = 2

    SEX_CHOICES = (
        (SEX_MALE, _('male')),
        (SEX_FEMALE, _('female')),
        )

    issue_name = models.CharField(max_length=255)
    ascii_issue_name = models.CharField(blank=True, max_length=255)
    pub_date = models.DateField(auto_now_add=True)
    issue_date = models.DateField()
    country = models.CharField(max_length=255, null=True, blank=True)
    ai_library = models.URLField(null=True, blank=True, max_length=255)
    photo = models.URLField(null=True, blank=True, max_length=255)
    description = models.TextField(null=True, blank=True)
    
    map_picker = models.CharField(max_length=255, null=True, blank=True)
    lat = models.FloatField()
    lon = models.FloatField()

    def admin_map_picker(self):
        return "<a href='http://google.com'>HELLO</a>"

    def get_absolute_url(self):
        return u"/%i"%self.pk
    
    def __unicode__(self):
        return u"%s" % (self.issue_name)

    def get_full_name(self):
        return unicode(self)
    
    def get_url_key(self):
        return u"%s-%s-%i"%(self.ascii_issue_name, self.get_full_name(), self.pk).replace(" ", "-")
        
    def get_json(self):
        return u'{"X":%f,"Y":%f,"text":"%s","detailJson":"%s","imgLink":"%s"}'%(self.lat, self.lon, self.issue_name, self.get_absolute_url(), self.photo)

    def get_detail_json(self):
        return '{"issue_date":"%s","pub_date":"%s","country":"%s","photo":"%s","description":"%s"}'%(self.issue_date, self.pub_date, self.country, self.photo, self.description)

    def save(self):
        #self.ascii_issue_name = unicode2ascii(self.issue_name)
        super(Person, self).save()


    class Meta:
        verbose_name = _('Person')
        verbose_name_plural = _('Persons')


