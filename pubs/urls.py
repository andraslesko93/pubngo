from django.conf.urls import patterns, url
from django.views.generic import TemplateView
from views import get_pubs_by_preferences, post_current_position, discover, register, user_login, user_logout
from django.conf import settings


urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name="pubs/index.html"), name='index'),
    url(r'^recommender/$', get_pubs_by_preferences, name='discover'),
    url(r'^post_current_position/', post_current_position, name='post_current_position'),
    url(r'^discover/$', discover, name='discover'),
    url(r'^register/$', register, name='register'),
    url(r'^login/$', user_login, name='login'),
    url(r'^logout/$', user_logout, name='logout'),
    url(r'^terms_of_use/$', TemplateView.as_view(template_name="pubs/terms_of_use.html"), name='terms_of_use'),
    )

if settings.DEBUG:
    urlpatterns += patterns(
        'django.views.static',
        (r'^media/(?P<path>.*)',
        'serve',
        {'document_root': settings.MEDIA_ROOT}), )