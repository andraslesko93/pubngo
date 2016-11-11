from django.shortcuts import render
def get_pubs_by_preferences(request):

    return render(request, 'pubs/recommender.html')