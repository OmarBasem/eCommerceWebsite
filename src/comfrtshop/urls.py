from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


admin.site.site_header = "ComfrtShop"
admin.site.index_title = "API adminstration"

urlpatterns = []

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [
    path('admin/', admin.site.urls),
    url(r'^api/auth/', include('knox.urls')),
    url(r'^api/', include('shop.urls', namespace='shop')),
    url(r'^', TemplateView.as_view(template_name='index.html'), name='index'),

]

