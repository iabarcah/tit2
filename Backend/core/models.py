from django.db import models

# Create your models here.
TIPO_EVENT = [
    ('T','torneo'),
    ('M','maraton'),
    ('Z','zumba')
]
class Evento(models.Model):
    id_evento = models.AutoField(primary_key=True)
    nombre_evento = models.CharField(max_length=250)
    tipo_evento = models.CharField(max_length=250, choices=TIPO_EVENT)
    cupo_evento = models.IntegerField()
    fecha_inicio_evento = models.DateField()
    fecha_fin_evento = models.DateField()
    hora_inicio_evento = models.DateTimeField()
    hora_fin_evento = models.DateTimeField()
    direccion_evento = models.CharField(max_length=250)
    descripcion_evento = models.TextField()
    requisitos_evento = models.TextField()
    estado_evento = models.CharField(max_length=250)
    URL_form = models.CharField(max_length=1500, default='')