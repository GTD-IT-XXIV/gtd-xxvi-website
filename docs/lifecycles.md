# Services Lifecycles

## Payment Lifecycle

1. We issue the checkout session to get the `clientSecret` from our backend (in turn requesting the stripe API). `clientSecret` will correspond to the user's payment lifecycle.
2. With the `clientSecret`, the Stripe’s React integration library will mount the payment component that is PCI compliant (in short, safe). Also, in this case, only PayNow payment method is accepted **(as other payment methods are either more expensive and less relevant/convenient for us)**
3. The flow branches out into two cases:
   1. The payment succeeds: it will generate the relevant tickets and set to the respective email
   2. The payment fails: it will ‘unreserve’ those slots that are temporarily reserved. There are 2 possibilities: the payment session times out or the payment is just failing
4. In either cases, Stripe will give you session id and with that, you can get the information about your payment in the client

### Summary

Taken from [Stripe docs](https://stripe.com/docs/payments/checkout/how-checkout-works?payment-ui=embeddable-payment-form):
![Summary](assets/Screenshot%202023-12-28%20at%2013.43.09.png)

### References

- [Checkout session lifecycle](https://stripe.com/docs/payments/checkout/how-checkout-works)
- [Webhook event trigger](https://stripe.com/docs/webhooks)
