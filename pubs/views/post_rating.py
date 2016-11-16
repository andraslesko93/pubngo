from django.http.response import HttpResponse
from pubs.models import Rating
from django.shortcuts import get_object_or_404
def post_rating(request):
    if request.method == 'POST':
        print "called"
        pk = request.POST.get("pk", None)
        price = request.POST.get("price", None)
        feeling = request.POST.get("feeling", None)
        if (price=="" or feeling==""):
            return HttpResponse(status=400)
        rating = get_object_or_404(Rating, pk=pk)
        rating.status = "rated"
        rating.feeling=feeling
        rating.price=price
        rating.save()
        return HttpResponse("200")
    return HttpResponse(status=204)