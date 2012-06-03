from django.db import models

from django.contrib.auth.models import User
#from django.contrib.gis.db import models
from django.core.validators import RegexValidator
from django.utils.translation import ugettext_lazy as _
from aimap.util import unicode2ascii

class Country(models.Model):
    """A state or country."""

    code = models.CharField(max_length=8, primary_key=True)
    name = models.CharField(max_length=255)
 
    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = _('Country')
        verbose_name_plural = _('Countries')


class Person(models.Model):
    """A person, a prisoner."""

    SEX_MALE = 1
    SEX_FEMALE = 2

    SEX_CHOICES = (
        (SEX_MALE, _('male')),
        (SEX_FEMALE, _('female')),
        )

    issue_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    ascii_issue_name = models.CharField(blank=True, max_length=255)
    ascii_first_name = models.CharField(blank=True, max_length=255)
    ascii_last_name = models.CharField(blank=True, max_length=255)
    sex = models.IntegerField(choices=SEX_CHOICES)
    pub_date = models.DateField(auto_now_add=True)
    issue_date = models.DateField()
    birth = models.DateField(null=True, blank=True, verbose_name=_('Date of birth'))
    country = models.ForeignKey(Country, null=True, blank=True)
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
        return u"%s %s" % (self.first_name, self.last_name)

    def get_full_name(self):
        return unicode(self)
    
    def get_url_key(self):
        return u"%s-%s-%i"%(self.ascii_issue_name, self.get_full_name(), self.pk).replace(" ", "-")
        
    def get_json(self):
        return u'{"X":%f,"Y":%f,"text":"%s","detailJson":"%s","imgLink":"%s"}'%(self.lat, self.lon, self.issue_name, self.get_absolute_url(), self.photo)

    def get_detail_json(self):
        return '{"full_name":"%s","sex":"%s","issue_date":"%s","pub_date":"%s","birth":"%s","country":"%s","photo":"%s","description":"%s"}'%(self.get_full_name(), self.sex, self.issue_date, self.pub_date, self.birth, self.country, self.photo, self.description)

    def save(self):
        self.ascii_issue_name = unicode2ascii(self.issue_name)
        self.ascii_first_name = unicode2ascii(self.first_name)
        self.ascii_last_name = unicode2ascii(self.last_name)
        super(Person, self).save()


    class Meta:
        verbose_name = _('Person')
        verbose_name_plural = _('Persons')


