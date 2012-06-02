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
    ascii_first_name = models.CharField(blank=True, max_length=255)
    ascii_last_name = models.CharField(blank=True, max_length=255)
    sex = models.IntegerField(choices=SEX_CHOICES)
    pub_date = models.DateField(auto_now_add=True)
    issue_date = models.DateField()
    birth = models.DateField(null=True, blank=True, verbose_name=_('Date of birth'))
    country = models.ForeignKey(Country, null=True, blank=True)
    ai_library = models.URLField(null=True, blank=True, max_length=255)
    
    lat = models.FloatField()
    lon = models.FloatField()

    def save(self):
        self.ascii_first_name = unicode2ascii(self.first_name)
        self.ascii_last_name = unicode2ascii(self.last_name)
        super(Person, self).save()

    def __unicode__(self):
        return u"%s %s" % (self.last_name, self.first_name)

    def get_full_name(self):
        return unicode(self)

    class Meta:
        verbose_name = _('Person')
        verbose_name_plural = _('Persons')


