from django.contrib import admin
from .models import Position


class PositionAdmin(admin.ModelAdmin):
    list_display = ('job_title', 'company_name', 'user_id', 'country', 'city')


admin.site.register(Position)
