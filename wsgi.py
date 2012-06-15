import os
import sys

ROOT = os.path.normpath(os.path.join(__file__, ".."))

sys.path.append(ROOT)
sys.path.append(os.path.normpath(os.path.join(ROOT, 'app')))

os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
