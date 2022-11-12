from django.contrib import admin
from django.urls import path, include
from .routers import router
from django.views.generic import TemplateView
from core import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', views.home, name='home'),
]
