from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from django.db.models.fields.related import ManyToManyField
from geoposition.fields import GeopositionField
from django.utils import timezone

class Rating(models.Model):
    user = models.ForeignKey(User) 
    price = models.IntegerField() #siman ft-ban egyenlore
    feeling = models.CharField(max_length = 10, blank=True) #regexp arra, hogy kesdobalo//bulizos//beszelgetos
    status = models.CharField(max_length=10, default ="pending")
class Pub(models.Model):
    approvation = models.CharField(max_length = 10, default="pending")
    name = models.CharField(max_length = 150)
    position = GeopositionField()
    ratings = ManyToManyField(Rating, blank=True)
    objects = models.Manager() # The default manager.

class Checkin(models.Model):
    user = models.ForeignKey(User)
    pub = models.ForeignKey(Pub)
    time = models.DateTimeField(default = timezone.now)

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    local_picture = models.ImageField(upload_to='profile_images', blank=True, default='profile_images/default.png')
    picture_url=models.URLField(blank=True)
    slug = models.SlugField(unique=True)
    visited_pubs = models.ManyToManyField(Pub)
    def save(self, *args, **kwargs):
                super(UserProfile, self).save(*args, **kwargs)
                self.slug = slugify(self.user.username)+ "-" + str(self.id)
                super(UserProfile, self).save(*args, **kwargs)
    
    def __unicode__(self):
        return self.user.username

class UserPreferences(models.Model):
    #Ajanlorendszerhez, ez alapjan listaz
    user = models.OneToOneField(User)
    max_distance = models.IntegerField()
    max_price = models.IntegerField() #
    feeling = models.CharField(max_length = 10) #regexp arra, hogy kesdobalo//bulizos//beszelgetos ---> Akar Mihez van kedved ma este? 
