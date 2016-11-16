import json
from django.http.response import HttpResponse
def get_pub_feelings(request):
    json_list = [
                 {"feeling": "Quiet pub for talking"},
                 {"feeling": "Ruinpub"},
                 {"feeling": "Party pub"},
                 {"feeling": "Knife thrower"},
                 ]
    return HttpResponse(json.dumps(json_list, ensure_ascii=False).encode('utf8'))