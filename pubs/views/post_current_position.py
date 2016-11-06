from django.shortcuts import render
from pubs.models import Pub
from geoposition import Geoposition
def post_current_position(request):
    if request.method == 'POST':
        print "---------------------triggered-----------------"
        lat= request.POST.get("lat")
        lng = request.POST.get("lng")
        pub_name = request.POST.get("pubName")
        print lat
        print lng
        print pub_name
        position =Geoposition(latitude=lat, longitude=lng)
        pub = Pub(name=pub_name, position=position)
        pub.save()
    return render(request,'pubs/discover.html')