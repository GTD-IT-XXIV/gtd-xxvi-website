# Entity-Relationship Diagram

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
    Int bookingId FK
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
    Boolean valid
    DateTime created
  }

  Event ||--|{ Bundle : ""
  Event ||--|{ Timeslot : ""
  Bundle ||--o{ Ticket : ""
  Timeslot ||--o{ Ticket : ""
  Ticket }o--|| Booking : ""
```

## Database Schema

```mermaid
erDiagram
  Event {
    integer id PK
    text name
    text description
    date startDate
    date endDate
  }
  Bundle {
    integer id PK
    integer eventId FK
    text name
    text[] details
    numeric price
    integer quantity
    integer remainingAmount
  }
  Timeslot {
    integer id PK
    integer eventId FK
    timestamp startTime
    timestamp endTime
    Int remainingSlots
  }
  Ticket {
    integer id PK
    integer bookingId FK
    integer bundleId FK
    integer timeslotId FK
    text paymentIntentId
  }
  Booking {
    integer id PK
    text name
    text email
    text telegramHandle
    text phoneNumber
    boolean valid
    timestamp created
  }
  PaymentIntent {
    text id
    text customer
    bigint amount
    text currency
    text payment_method
    timestamp created
    attrs jsonb
  }

  Event ||--|{ Bundle : ""
  Event ||--|{ Timeslot : ""
  Bundle ||--o{ Ticket : ""
  Timeslot ||--o{ Ticket : ""
  Ticket }o--|| Booking : ""
  Ticket }o..|| PaymentIntent: ""
```

## Notes

- `Bundle.quantity`: number of slots this bundle occupies; number of people in this bundle
- `Bundle.remainingAmount`: number of bundles available
- `Ticket.paymentIntentId`: reference for Stripe PaymentIntent ID; not a foreign key
- `Booking.valid`: validity of the booking; Stripe webhook will check this; can be manually set to invalidate the booking
