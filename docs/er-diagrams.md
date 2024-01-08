# Entity-Relationship Diagrams

## Prisma Schema

```mermaid
erDiagram
  Event {
    Int id PK
    String name
    String description
    Date startDate
    Date endDate
  }
  Bundle {
    Int id PK
    Int eventId FK
    String name
    String[] details
    Decimal price
    Int quantity
    Int remainingAmount
  }
  Timeslot {
    Int id PK
    Int eventId FK
    DateTime startTime
    DateTime endTime
    Int remainingSlots
  }
  Ticket {
    Int id PK
    String name
    String email
    String telegramHandle
    String phoneNumber
    Int bundleId FK
    Int timeslotId FK
    String paymentIntentId
  }
  Booking {
    Int id PK
    String name
    String email
    String telegramHandle
    String phoneNumber
    Int eventId FK
    Int bundleId FK
    Int timeslotId FK
    Int quantity
    DateTime created
    Boolean valid
    String paymentIntentId
  }
  PaymentIntent {}

  Event ||--o{ Bundle: ""
  Event ||--o{ Booking : ""
  Booking }o--|| Bundle : ""
  Booking }o..o| PaymentIntent : ""
  Booking }o--|| Timeslot : ""
  Event ||--o{ Timeslot: ""
  Bundle ||--o{ Ticket : ""
  PaymentIntent ||..o{ Ticket : ""
  Timeslot ||--o{ Ticket : ""
```

## Notes

- `Bundle.quantity`: number of slots this bundle occupies; number of people in this bundle
- `Bundle.remainingAmount`: number of bundles available
- `Ticket.paymentIntentId`: reference for Stripe PaymentIntent ID; not a foreign key
- `Booking.paymentIntentId`: reference for Stripe PaymentIntent ID; not a foreign key
- `Booking.valid`: validity of the booking; Stripe webhook will check this; can be manually set to invalidate the booking
