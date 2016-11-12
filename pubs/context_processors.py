def rating_number_counter(request):
    from pubs.models import Rating
    if (request.user.is_authenticated()):
        pending_ratings = Rating.objects.filter (user__exact = request.user, status__exact ="pending")
        pending_rating_count = pending_ratings.count()
        waiting_ratings = Rating.objects.filter (user__exact = request.user, status__exact ="waiting")
        waiting_rating_count = waiting_ratings.count()
    else:
        pending_rating_count = 0
        waiting_rating_count = 0
    return {'waiting_rating_count':waiting_rating_count, 'pending_rating_count':pending_rating_count}
  

def switch_rating_status (request):
    from pubs.models import Rating
    from django.utils import timezone
    from datetime import timedelta
    now = timezone.now()
    dummy =""
    if (request.user.is_authenticated()): 
        try:
            waiting_ratings = Rating.objects.filter(user__exact = request.user, status__exact = "waiting")
        except Rating.DoesNotExist:
            pass
        now = now + timezone.timedelta(0, 60)
        for waiting_rating in waiting_ratings:    
            #only for debug, you should change 120 to a higher number
            if (now >= (waiting_rating.timestamp + timedelta(seconds = 120))):
                waiting_rating.status = "pending"
                waiting_rating.save()                
    return {'dummy':dummy}