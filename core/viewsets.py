from rest_framework import viewsets
from .models import Evento
from .serializers import EventoSerializers


class EventoViewset(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializers