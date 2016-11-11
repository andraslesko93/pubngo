from django.http.response import HttpResponse
from pubs.models import Checkin, Pub, Rating
from django.shortcuts import get_object_or_404
def post_checkin(request):
    if request.method == 'POST':
        pk= request.POST.get("pk", None)
        pub = get_object_or_404(Pub, pk=pk)
        checkin=Checkin(user=request.user, pub=pub)
        checkin.save()
        #rating = Rating(user=request.user, pub=pub)
        #rating.save()
        #Not the best solution for httpresponse but it works
        return HttpResponse("200")
    return HttpResponse(status=204)
