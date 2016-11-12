#only for debug, it can be deleted later, only works for users with names without accents
from django.http.response import HttpResponse
from pubs.models import Checkin
import json
from django.utils.html import escape
from django.utils import timezone
from datetime import timedelta
def get_checkins(request):
    current_time = (timezone.now())
    #for debug:
    one_hour_before=current_time-timedelta(seconds=60)
    #real:
    #one_hour_before=current_time-timedelta(seconds=3600)
    checkins = Checkin.objects.filter(user=request.user, time__gte=one_hour_before)
    json_list = []
    for checkin in checkins:
        json_list.append({
                          'pubName': str(checkin.pub.name),
                          'who':str(checkin.user.username),
                          'when': str(checkin.time)
            }) 
    for json_list_element in json_list:
        escape(json_list_element)
    return HttpResponse(json.dumps(json_list, ensure_ascii=False).encode('utf8'))    