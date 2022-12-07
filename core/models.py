from django.db import models

# Create your models here.

class Evento(models.Model):
    id_evento = models.AutoField(primary_key=True)
    nombre_evento = models.CharField(max_length=250)
    tipo_evento = models.CharField(max_length=250)
    cupo_evento = models.IntegerField()
    fecha_inicio_evento = models.DateField()
    fecha_fin_evento = models.DateField()
    #hora_inicio_evento = models.DateTimeField()
    #hora_fin_evento = models.DateTimeField()
    direccion_evento = models.CharField(max_length=250)
    descripcion_evento = models.TextField()
    requisitos_evento = models.TextField()
    estado_evento = models.CharField(max_length=250)
    url_evento = models.CharField(max_length=250)