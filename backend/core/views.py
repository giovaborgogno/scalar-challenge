from django.http import JsonResponse
import os

def health_check(request):
    version_file_path = os.path.join(os.path.dirname(__file__), '../VERSION')
    try:
        with open(version_file_path, 'r') as version_file:
            version = version_file.read().strip()
    except FileNotFoundError:
        version = "unknown"

    return JsonResponse({"version": version})
