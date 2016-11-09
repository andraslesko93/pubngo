from django.shortcuts import render
def discover(request):
    return render(request, "pubs/discover.html")