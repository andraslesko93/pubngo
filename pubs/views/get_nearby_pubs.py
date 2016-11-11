from django.http.response import HttpResponse
from pubs.models import Pub
import json
from pubs.get_disctance import get_distance
from django.utils.html import escape
def get_nearby_pubs(request):
    print "------------------tiggered---------------"
    lat = request.GET.get('lat', '')
    lng = request.GET.get('lng', '')
    pubs = Pub.objects.all()
    json_list = []
    for pub in pubs:
        distance = get_distance(float(lng), float(lat), pub.position.longitude, pub.position.latitude)
        #pubs in 50m range
        if(distance < 0.05):
            print pub.name
            json_list.append({
                          'pubName': str(pub.name),
                          'key':pub.pk
            }) 
    for json_list_element in json_list:
        escape(json_list_element)
    return HttpResponse(json.dumps(json_list, ensure_ascii=False).encode('utf8'))    