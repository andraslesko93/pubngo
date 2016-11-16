import json
from django.utils.html import escape
from pubs.models import Rating
from django.http.response import HttpResponse
def get_ratings(request):    
    json_list = []
    if request.method=="GET":
        print "called"
        pending_ratings = Rating.objects.filter(user=request.user, status__exact = "pending")
        for pending_rating in pending_ratings:
            print pending_rating.pk
            json_list.append({
                'key': pending_rating.pk,
                'pubName': pending_rating.pub.name
            })
            print json_list
        for json_list_element in json_list:
            escape(json_list_element)
    return HttpResponse(json.dumps(json_list, ensure_ascii=False).encode('utf8'))