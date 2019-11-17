from channels.routing import ProtocolTypeRouter, URLRouter
import stocks.routing

application = ProtocolTypeRouter({
    'http': URLRouter(stocks.routing.urlpatterns),
})
