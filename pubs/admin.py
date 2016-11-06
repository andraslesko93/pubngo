from django.contrib import admin
from pubs.models import UserProfile, Pub, UserPreferences, Rating
# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Pub)
admin.site.register(UserPreferences)
admin.site.register(Rating)