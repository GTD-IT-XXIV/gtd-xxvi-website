# Sequence Diagrams

## `RegisterForEvent`

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant RegistrationPage
  participant BundleSelection
  participant Store

  User ->> RegistrationPage : open
  activate RegistrationPage
  RegistrationPage -->> User : display page

  RegistrationPage ->> BundleSelection : show popup
  activate BundleSelection
  BundleSelection -) +BundlesRouter : get all bundles by event
  BundlesRouter -->> -BundleSelection : bundles
  BundleSelection -) +TimeslotsRouter : get all timeslots by event
  TimeslotsRouter -->> -BundleSelection : timeslots
  BundleSelection ->> BundleSelection : check bundle availability
  BundleSelection -->> User : display bundles popup

  User ->> BundleSelection : select an available bundle
  BundleSelection -->> -RegistrationPage : selected bundle
  RegistrationPage ->> Store : save selected bundle
  RegistrationPage -->> User : display selected bundle

  User ->> RegistrationPage : fill details
  RegistrationPage ->> Store : save details

  User ->> RegistrationPage : click next

  RegistrationPage -) BookingsRouter : check booking by email
  activate BookingsRouter
  break booking exists
    BookingsRouter -->> RegistrationPage : booking
    Note over RegistrationPage : ref: PayForEvent
  end
  BookingsRouter -->> RegistrationPage : not found
  deactivate BookingsRouter

  deactivate RegistrationPage

  Note over RegistrationPage : ref: BookForEvent
```

## `BookForEvent`

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant RegistrationPage
  participant BookingPage
  participant Store

  activate RegistrationPage
  alt Event only has one timeslot
    RegistrationPage -) +BookingsRouter : create booking
    BookingsRouter -->> -RegistrationPage : booking
    RegistrationPage -) PaymentsRouter : create checkout session
    activate PaymentsRouter
    PaymentsRouter ->> +BundlesRouter : decrement remaining amount
    BundlesRouter -->> -PaymentsRouter : remaining amount
    PaymentsRouter ->> +TimeslotsRouter : decrement remaining slots
    TimeslotsRouter -->> -PaymentsRouter : remaining slots

    break remaining amount or remaining slots < 0
      Note over PaymentsRouter, TimeslotsRouter : Rollback
      PaymentsRouter -->> RegistrationPage : error
      RegistrationPage -->> User : display error
      RegistrationPage ->> Store : delete saved bundle
    end
    PaymentsRouter ->> +BookingsRouter : update booking
    Note left of BookingsRouter : update paymentIntentId
    BookingsRouter -->> -PaymentsRouter : updated booking
    PaymentsRouter -->> RegistrationPage : checkout session client secret
    deactivate PaymentsRouter
    RegistrationPage ->> Store : save checkout session client secret

    Note over RegistrationPage : ref: PayForEvent
  else Event has more than one timeslots
    RegistrationPage ->> BookingPage : navigate
    deactivate RegistrationPage
    activate BookingPage

    BookingPage -) +TimeslotsRouter : get all timeslots by event
    TimeslotsRouter -->> -BookingPage : timeslots
    BookingPage -->> User : display timeslots

    User ->> BookingPage : select an available timeslot

    BookingPage -) +BookingsRouter : create booking
    BookingsRouter -->> -BookingPage : booking
    BookingPage -) PaymentsRouter : create checkout session
    activate PaymentsRouter

    PaymentsRouter ->> +BundlesRouter : decrement remaining amount
    BundlesRouter -->> -PaymentsRouter : remaining amount
    PaymentsRouter ->> +TimeslotsRouter : decrement remaining slots
    TimeslotsRouter -->> -PaymentsRouter : remaining slots

    break remaining amount or remaining slots < 0
      Note over PaymentsRouter, TimeslotsRouter : Rollback
      PaymentsRouter -->> BookingPage : error
      BookingPage -->> User : display error
      alt remaining amount < 0
        BookingPage ->> Store : delete saved bundle
        Note right of User : (retry) ref: RegisterForEvent
      else remaining slots < 0
        Note right of User : (retry) ref: BookForEvent
      end
    end
    PaymentsRouter ->> +BookingsRouter : update booking
    Note left of BookingsRouter : update paymentIntentId
    BookingsRouter -->> -PaymentsRouter : updated booking
    PaymentsRouter -->> BookingPage : checkout session client secret
    deactivate PaymentsRouter
    BookingPage ->> Store : save selected timeslot
    BookingPage ->> Store : save checkout session client secret

    BookingPage -->> User : display selected timeslot
    opt change timeslot
      Note right of User : ref: BookForEvent (17)
    end

    User ->> BookingPage : click next
    deactivate BookingPage
    Note over BookingPage : ref: PayForEvent
  end
```

## `PayForEvent`

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant RegistrationPage
  participant BookingPage
  participant CheckoutPage
  participant Store
  participant BookingsRouter
  participant TicketsRouter
  participant StripeWebhook
  actor Stripe

  activate RegistrationPage
  activate BookingPage
  alt
    RegistrationPage ->> CheckoutPage : navigate
    activate CheckoutPage
  else
    BookingPage ->> CheckoutPage : navigate
  end

  CheckoutPage ->> Store : get checkout session client secret
  Store -->> CheckoutPage : checkout session client secret

  CheckoutPage -->> User : display checkout form
  User ->> CheckoutPage : fill checkout form & click pay
  CheckoutPage -->> User : PayNow QR
  User ->> CheckoutPage : scan PayNow & pay
  Stripe -->> StripeWebhook : Stripe payment event
  alt payment expired
    StripeWebhook -->> CheckoutPage : error
    activate StripeWebhook
    CheckoutPage -->> User : display error
    Note right of User : ref: RegisterForEvent
  else payment completed
    StripeWebhook ->> +BookingsRouter : get booking
    BookingsRouter -->> -StripeWebhook : booking

    break booking invalid
      StripeWebhook -->> CheckoutPage : error
      CheckoutPage -->> User : display error
      Note right of User : suru kontak CS
    end

    StripeWebhook ->> +TicketsRouter : create tickets
    TicketsRouter -->> -StripeWebhook : tickets
    StripeWebhook -->> CheckoutPage : tickets
    CheckoutPage -->> User : display tickets
    StripeWebhook -->> User : email tickets
  end

  StripeWebhook -) BookingsRouter : delete booking
  deactivate StripeWebhook

  CheckoutPage ->> Store : delete saved bundle
  CheckoutPage ->> Store : delete saved timeslot
  deactivate CheckoutPage
```
