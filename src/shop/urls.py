from django.conf.urls import url, include

from .views import TestView, Register, Login, FetchCategoryItems, MakePayment, FetchPurchases, SearchItems, FetchCategories

app_name = 'shop'

urlpatterns = [
    url('^test-view/$', TestView.as_view()),
    url('^register/$', Register.as_view()),
    url('^login/$', Login.as_view()),
    url(r'^fetch-category-items/$', FetchCategoryItems.as_view(), name='fetch-category-items'),
    url(r'^fetch-categories/$', FetchCategories.as_view(), name='fetch-categories'),
    url(r'^fetch-purchases/$', FetchPurchases.as_view(), name='fetch-purchases'),
    url(r'^make-payment/$', MakePayment.as_view(), name='make-payment'),
    url(r'^search/$', SearchItems.as_view(), name='search'),
]