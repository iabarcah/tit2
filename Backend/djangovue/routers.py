from rest_framework import routers
from core.viewsets import EventoViewset


router = routers.DefaultRouter()
router.register(r'evento', EventoViewset)