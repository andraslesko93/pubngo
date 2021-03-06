from .models import UserProfile
from django.http.response import HttpResponseRedirect

def create_user_profile(backend, user, response, details, *args, **kwargs):
    user_profile_match=UserProfile.objects.filter(user=user)
    if (user_profile_match.count()>0):
        HttpResponseRedirect('/')
        return
    if backend.name == 'facebook':
        picture  = 'http://graph.facebook.com/{0}/picture?width=100'.format(response['id'])
        profile = UserProfile(user=user, picture_url=picture)
        profile.save()
    HttpResponseRedirect('/')