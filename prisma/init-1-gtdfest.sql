-- Insert Sample Data
-- Insert Sample Events
INSERT INTO
  "Event" (
    name,
    description,
    location,
    "startDate",
    "endDate"
  )
VALUES
  (
    'GTD Fest',
    'Play 5 enchanting arcade games; gather your friends and immortalize the moment through our photobooth; indulge in magically hand-crafted food; unleash your creativity by painting your own tote bag; and enter the Lucky Draw to stand a chance at winning exciting prizes!',
    'NTU Function Hall 12',
    '2024-02-17 17:00:00',
    '2024-02-17 22:00:00'
  ),
  (
    'Escape Room',
    'Embark on a thrilling journey in "Nyctophobia," where you and your team of 5 wizards have been captured by a malevolent Death Eater. As you navigate through each challenge, race against time to escape the castle before the dark experiments unfold. Can you conquer your fears and break free from the clutches of Nyctophobia?',
    'NTU NS TR',
    '2024-02-18 10:00:00',
    '2024-02-18 22:40:00'
  );

-- Insert Sample Bundles
INSERT INTO
  "Bundle" (
    "eventName",
    name,
    details,
    price,
    quantity,
    "remainingAmount",
    "maxPurchases",
    open,
    close
  )
VALUES
  (
    'GTD Fest',
    'Individual',
    ARRAY[
      'Entrance fee',
      'Access to 5 different arcade games',
      '1 strip photo from Photobooth',
      '1 food item',
      '1 lucky draw chance'
    ],
    10.00,
    1,
    null,
    100,
    '2024-01-01 00:00:00',
    '2024-02-28 23:59:59'
  ),
  (
    'GTD Fest',
    'Bundle - 6 people',
    ARRAY[
      'Entrance fee',
      'Access to 5 different arcade games',
      '1 strip photo from Photobooth',
      '1 food item',
      '1 lucky draw chance'
    ],
    50.00,
    6,
    null,
    100,
    '2024-01-01 00:00:00',
    '2024-02-28 23:59:59'
  ),
  (
    'Escape Room',
    'Early Bird - 5 people',
    ARRAY[
      'Price is for a group of 5 participants',
      'Duration: 80 minutes',
      'Please arrive 10 minutes before your scheduled time for the best experience'
    ],
    35.00,
    1,
    5,
    1,
    '2024-01-01 00:00:00',
    '2024-02-28 23:59:59'
  ),
  (
    'Escape Room',
    'Normal - 5 people',
    ARRAY[
      'Price is for a group of 5 participants',
      'Duration: 80 minutes',
      'Please arrive 10 minutes before your scheduled time for the best experience'
    ],
    45.00,
    1,
    null,
    1,
    '2024-01-01 00:00:00',
    '2024-02-28 23:59:59'
  );

INSERT INTO
  "Timeslot" (
    "eventName",
    "startTime",
    "endTime",
    "remainingSlots"
  )
VALUES
  (
    'GTD Fest',
    '2024-02-17 17:00:00',
    '2024-02-17 22:00:00',
    999
  ),
  (
    'Escape Room',
    '2023-02-18 10:00:00',
    '2023-02-18 11:20:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 10:50:00',
    '2023-02-18 12:10:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 11:40:00',
    '2023-02-18 13:00:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 13:10:00',
    '2023-02-18 14:30:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 14:00:00',
    '2023-02-18 15:20:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 14:50:00',
    '2023-02-18 16:10:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 15:40:00',
    '2023-02-18 17:00:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 16:30:00',
    '2023-02-18 17:50:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 17:20:00',
    '2023-02-18 18:40:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 18:50:00',
    '2023-02-18 20:10:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 19:40:00',
    '2023-02-18 21:00:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 20:30:00',
    '2023-02-18 21:50:00',
    1
  ),
  (
    'Escape Room',
    '2023-02-18 21:20:00',
    '2023-02-18 22:40:00',
    1
  )
