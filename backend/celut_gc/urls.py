from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('apps.accounts.urls')),
    path('api/internships/', include('apps.internships.urls')),
    path('api/projects/', include('apps.projects.urls')),
]
