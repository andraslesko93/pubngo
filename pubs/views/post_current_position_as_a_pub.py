from pubs.models import Pub, Checkin
from geoposition import Geoposition
from django.http.response import HttpResponse
def post_current_position_as_a_pub(request):
    if request.method == 'POST':
        #print "---------------------triggered-----------------"
        lat= request.POST.get("lat", None)
        lng = request.POST.get("lng", None)
        pub_name = request.POST.get("pubName", None)
        if (pub_name=="" or len(pub_name)>30):
            return HttpResponse(status=400)
        #print lat
        #print lng
        #print pub_name
        position =Geoposition(latitude=lat, longitude=lng)
        pub = Pub(name=pub_name, position=position)
        pub.save()
        checkin= Checkin(user=request.user, pub=pub)
        checkin.save()
        #Not the best solution for httpresponse but it works
        return HttpResponse("200")
    return HttpResponse(status=204)