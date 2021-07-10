from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from my_auth import views
from rest_framework import routers
from myapi import views as api_views
router = routers.SimpleRouter()
router.register(r'', api_views.ApplicationProcessViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("login/", views.login, name="login"),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),
    path('social-auth/', include('social_django.urls', namespace="social")),
    path('my_auth/', include('my_auth.urls')),
    path("", include('myapi.urls'))
    # path("", views.home, name="home"),
]
urlpatterns += router.urls
