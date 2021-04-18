import requests, os, json, time

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, viewsets, status, mixins
from .models import User, Address
from knox.models import AuthToken
import country_converter as coco

from .serializers import ItemSerialzer, UserSerializer, PurchaseSerializer, CategorySerializer
from .models import Item, Purchase, Category


class Register(APIView):

    def post(self, request):
        if User.objects.filter(email=request.data['email']).exists():
            return Response({"success": False})
        user = User.objects.create(name=request.data['name'], email=request.data['email'],
                                   username=request.data['email'])
        user.set_password(request.data['password'])
        user.save()
        return Response({
            "token": AuthToken.objects.create(user)[1],
            "success": True
        })


class Login(APIView):

    def post(self, request):
        user = User.objects.filter(email=request.data['email']).first()
        if not user:
            return Response({'exists': False})
        if not user.check_password(request.data['password']):
            return Response({'exists': True, 'correctPass': False})
        return Response({
            'exists': True,
            'correctPass': True,
            "user": UserSerializer(user).data,
            "token": AuthToken.objects.create(user)[1],
        })


class FetchCategoryItems(generics.ListAPIView):
    serializer_class = ItemSerialzer

    def get_queryset(self):
        category = self.request.GET.get('category')
        items = Item.objects.filter(category__name=category)
        return items


class FetchCategories(generics.ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all().order_by('id')


class FetchPurchases(generics.ListAPIView):
    serializer_class = PurchaseSerializer

    def get_queryset(self):
        purchases = Purchase.objects.filter(user=self.request.user)
        return purchases


class SearchItems(generics.ListAPIView):
    serializer_class = ItemSerialzer

    def get_queryset(self, *args, **kwargs):
        query = self.request.GET.get("q")
        items = Item.objects.filter(name__icontains=query)
        return items


class MakePayment(APIView):

    def post(self, request):
        if not request.user.address:
            address = Address.objects.create(country=request.data['country'], city=request.data['city'],
                                             street=request.data['street'], building=request.data['building'])
            request.user.address = address
            request.user.save()
        else:
            address = request.user.address
            address.country = request.data['country']
            address.city = request.data['city']
            address.street = request.data['street']
            address.building = request.data['building']
            address.save()

        # 3DS2 API
        three_ds2_api = 'https://api.test.paysafe.com/threedsecure/v2/accounts/' + os.environ['PAYSAFE_ACCOUNT_ID'] + '/authentications'
        headers = {'Content-Type': 'application/json', 'Authorization': 'Basic ' + os.environ['PAYSAFE_AUTH_TOKEN']}
        iso2_code = coco.convert(names=[request.data['country']], to='ISO2', not_found=None)
        RefNum = int(time.time())
        data = {
            "merchantRefNum": RefNum,
            "deviceFingerprintingId": request.data['deviceFingerprintingId'],
            "amount": request.data['amount'],
            "currency": "AED",
            "settleWithAuth": True,
            "authenticationPurpose": "PAYMENT_TRANSACTION",
            "deviceChannel": "SDK",
            "messageCategory": "PAYMENT",
            "merchantUrl": "https://www.comfrtshop.com",
            "billingDetails": {
                "street": request.data['street'],
                "city": request.data['city'],
                "country": iso2_code,
                "zip": "0000"
            },
            "card": {
                "holderName": request.data['holderName'],
                "cardNum": request.data['cardNum'],
                "cardExpiry": {
                    "month": request.data['expMonth'],
                    "year": request.data['expYear']
                }
            }
        }
        result = requests.post(three_ds2_api, headers=headers, data=json.dumps(data))
        if 'status' in result.json():
            status = result.json()['status']
        else:
            status = 'FAILED'
        response = {'status': status, 'RefNum': RefNum}

        # If 3DS2 authentication succeeds, then call the card payments API
        if status == 'COMPLETED':
            card_payments_api = 'https://api.test.paysafe.com/cardpayments/v1/accounts/' + os.environ['PAYSAFE_ACCOUNT_ID'] + '/auths'
            data = {
                "merchantRefNum": RefNum,
                "amount": request.data['amount'],
                "settleWithAuth": True,
                "billingDetails": {
                    "street": request.data['street'],
                    "city": request.data['city'],
                    "country": iso2_code,
                    "zip": "0000"
                },
                "card": {
                    "cardNum": request.data['cardNum'],
                    "cardExpiry": {
                        "month": request.data['expMonth'],
                        "year": request.data['expYear']
                    }
                }
            }
            result = requests.post(card_payments_api, headers=headers, data=json.dumps(data))
            response = {'status': result.json()['status'], 'RefNum': RefNum}
            for id in request.data['ids']:
                item = Item.objects.get(id=id)
                Purchase.objects.create(user=request.user, item=item, refNum=RefNum)
        return Response(response)


# class MakePayment(APIView):
#
#     def post(self, request):
#         if not request.user.address:
#             address = Address.objects.create(country=request.data['country'], city=request.data['city'], street=request.data['street'], building=request.data['building'])
#             request.user.address = address
#             request.user.save()
#         else:
#             address = request.user.address
#             address.country = request.data['country']
#             address.city = request.data['city']
#             address.street = request.data['street']
#             address.building = request.data['building']
#             address.save()
#         url = 'https://api.test.paysafe.com/cardpayments/v1/accounts/' + os.environ['PAYSAFE_ACCOUNT_ID'] + '/auths/'
#         headers = {'Content-Type': 'application/json', 'Authorization': 'Basic ' + os.environ['PAYSAFE_AUTH_TOKEN']}
#         iso2_code = coco.convert(names=[request.data['country']], to='ISO2', not_found=None)
#         RefNum = int(time.time())
#         data = {
#             "merchantRefNum": RefNum,
#             "amount": request.data['amount'],
#             "settleWithAuth": True,
#             "billingDetails": {
#                 "street": request.data['street'],
#                 "city": request.data['city'],
#                 "country": iso2_code,
#                 "zip": "0000"
#             },
#             "card": {
#                 "paymentToken": request.data['paymentToken']
#             }
#         }
#         result = requests.post(url, headers=headers, data=json.dumps(data))
#         response = {'status': result.json()['status'], 'RefNum': RefNum}
#         for id in request.data['ids']:
#             item = Item.objects.get(id=id)
#             Purchase.objects.create(user=request.user, item=item, refNum=RefNum)
#         return Response(response)


class TestView(APIView):

    def get(self, request):
        return Response(status=status.HTTP_200_OK)
