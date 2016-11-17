from django.http.response import HttpResponse
from pubs.models import Pub, Checkin
import json
from pubs.get_disctance import get_distance
from django.utils.html import escape
from django.utils import timezone
from datetime import timedelta
from django.db.models import Q
def get_nearby_pubs(request):
    lat = request.GET.get('lat', '')
    lng = request.GET.get('lng', '')
    current_time = (timezone.now())
    #for debug:
    one_hour_before=current_time-timedelta(seconds=60)
    #real:
    #one_hour_before=current_time-timedelta(seconds=3600)
    checkins = Checkin.objects.filter(user=request.user, timestamp__gte=one_hour_before)
    pubs=Pub.objects.all()
    #Should filter to approved pubs before release
    if (checkins.count()>0):
        pubs = pubs.filter(~Q(pk__in=checkins.values('pub')))
    json_list = []
    for pub in pubs:
        distance = get_distance(float(lng), float(lat), pub.position.longitude, pub.position.latitude)
        #pubs in 50m range
        if(distance < 0.05):
            #print pub.name
            json_list.append({
                          'pubName': pub.name,
                          'key':pub.pk
            }) 
    for json_list_element in json_list:
        escape(json_list_element)
    return HttpResponse(json.dumps(json_list, ensure_ascii=False).encode('utf8'))    