from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from django.apps import apps

from core import models


class UserAdmin(BaseUserAdmin):
    model = models.User
    ordering = ['id']
    list_display = ['email', 'localId']
    fieldsets = (
        (None, {
            'fields': (
                'email',
                'password'
            ),
        }),
        (_('Personal Info'), {
            'fields': (
                'localId',
            ),
        }),
        (_('Permissions'), {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser'
            ),
        }),
        (_('Important dates'), {
            'fields': (
                'last_login',
            ),
        }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )


class ListAdminMixin(object):
    def __init__(self, model, admin_site):
        self.list_display = [field.name for field in model._meta.fields]
        super(ListAdminMixin, self).__init__(model, admin_site)


admin.site.register(models.User, UserAdmin)

app_models = apps.get_models()

for model in app_models:
    admin_class = type('AdminClass', (ListAdminMixin, admin.ModelAdmin), {})
    try:
        admin.site.register(model, admin_class)
    except admin.sites.AlreadyRegistered:
        pass
