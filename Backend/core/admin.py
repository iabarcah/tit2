from django.contrib import admin
from django.db import models
from.models import Evento
# Register your models here.

models_list = [Evento]
admin.site.register(models_list)
#admin/admin