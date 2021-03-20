from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from my_auth import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('myapi.urls')),
    path("login/", views.login, name="login"),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),
    path('social-auth/', include('social_django.urls', namespace="social")),
    path('my_auth/', include('my_auth.urls')),
    path('application_process/', include('application_process.urls')),
    path("", views.home, name="home"),
]
