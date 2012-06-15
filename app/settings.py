from djangosettings import *

# Django lib
INSTALLED_APPS += (
)

# Project apps
INSTALLED_APPS += (
    "aimap",
)

# Django settings
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'mail@nigroup.cz'
EMAIL_HOST_PASSWORD = '****'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
SERVER_EMAIL = EMAIL_HOST_USER
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# libs settings
ACCOUNT_ACTIVATION_DAYS = 1
LOGIN_URL = "/"

# App settings
