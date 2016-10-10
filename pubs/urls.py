from django.conf.urls import patterns, url
from django.views.generic import TemplateView
import views

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name="pubs/index.html"), name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^terms_of_use/$', TemplateView.as_view(template_name="pubs/terms_of_use.html"), name='terms_of_use'),
    
    )