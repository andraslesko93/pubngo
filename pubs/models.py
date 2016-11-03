from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from django.db.models.fields.related import ManyToManyField

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    local_picture = models.ImageField(upload_to='profile_images', blank=True, default='profile_images/default.png')
    picture_url=models.URLField(blank=True)
    slug = models.SlugField(unique=True)
    def save(self, *args, **kwargs):
                super(UserProfile, self).save(*args, **kwargs)
                self.slug = slugify(self.user.username)+ "-" + str(self.id)
                super(UserProfile, self).save(*args, **kwargs)
    
    def __unicode__(self):
        return self.user.username

class UserPreferences(models.Model):
    #Ajanlorendszerhez, ez alapjan listaz
    user = models.OneToOneField(User)
    distance_importance = models.IntegerField() #mennyire fontos h kozel legyen
    price_importance = models.IntegerField() #mennyire fontos, hogy olcso legyen
    feeling = models.CharField(max_length = 10) #regexp arra, hogy kesdobalo//bulizos//beszelgetos ---> Akar Mihez van kedved ma este? 
    #Feeling szuresi feltetel lesz, tobbi ertek alapja vmi pref matrixot szamol

class Rating(models.Model):
    user = models.ForeignKey(User) #letaroljuk, hogy ki adat hozza, vagy anonim?
    price = models.IntegerField() #siman ft-ban egyenlore
    feeling = models.CharField(max_length = 10) #regexp arra, hogy kesdobalo//bulizos//beszelgetos

class Location(models.Model): #mehet akar majd ra google maps-es cucc is
    x_chord = models.FloatField()
    y_chord = models.FloatField()
    
class Pub(models.Model):
    name = models.CharField(max_length = 150)
    location = models.OneToOneField(Location)
    ratings = ManyToManyField(Rating)