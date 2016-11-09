from pubs.models import Pub
from geoposition import Geoposition
from django.http.response import HttpResponse
def post_current_position(request):
    if request.method == 'POST':
        print "---------------------triggered-----------------"
        lat= request.POST.get("lat", None)
        lng = request.POST.get("lng", None)
        pub_name = request.POST.get("pubName", None)
        print lat
        print lng
        print pub_name
        position =Geoposition(latitude=lat, longitude=lng)
        pub = Pub(name=pub_name, position=position)
        pub.save()
        return HttpResponse("400")
    return HttpResponse("K.")