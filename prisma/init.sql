-- Insert Sample Data
-- Insert Sample Events
INSERT INTO
  "Event" (name, description, "startDate", "endDate")
VALUES
  (
    'GTD Fest',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nunc lorem, commodo consequat ligula placerat, ultrices malesuada tellus. Sed consectetur accumsan posuere. Proin tincidunt risus vitae risus iaculis, non dignissim est cursus. Aliquam id nisl nisl. Maecenas pulvinar dapibus tincidunt. Nunc tempor cursus malesuada. Fusce ex urna, varius et auctor in, tempus non lorem.',
    '2024-02-17 00:00:00',
    '2024-02-17 23:59:59'
  ),
  (
    'Escape Room',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nunc lorem, commodo consequat ligula placerat, ultrices malesuada tellus. Sed consectetur accumsan posuere. Proin tincidunt risus vitae risus iaculis, non dignissim est cursus. Aliquam id nisl nisl. Maecenas pulvinar dapibus tincidunt. Nunc tempor cursus malesuada. Fusce ex urna, varius et auctor in, tempus non lorem.',
    '2024-02-18 00:00:00',
    '2024-02-18 23:59:59'
  );

-- Insert Sample Bundles
INSERT INTO
  "Bundle" (
    name,
    details,
    price,
    quantity,
    "remainingAmount",
    "eventId"
  )
VALUES
  (
    'Individual',
    ARRAY[
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Nunc pharetra fermentum lacus nec tempus. Morbi id tellus sollicitudin, semper massa a, semper erat.',
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
    ],
    10.00,
    1,
    null,
    1
  ),
  (
    'Bundle',
    ARRAY[
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Nunc pharetra fermentum lacus nec tempus. Morbi id tellus sollicitudin, semper massa a, semper erat.',
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
    ],
    50.00,
    6,
    null,
    1
  ),
  (
    'Bundle Early Bird',
    ARRAY[
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Nunc pharetra fermentum lacus nec tempus. Morbi id tellus sollicitudin, semper massa a, semper erat.',
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
    ],
    35.00,
    5,
    5,
    2
  ),
  (
    'Bundle',
    ARRAY[
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Nunc pharetra fermentum lacus nec tempus. Morbi id tellus sollicitudin, semper massa a, semper erat.',
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
    ],
    45.00,
    5,
    null,
    2
  );

INSERT INTO
  "Timeslot" (
    "startTime",
    "endTime",
    "remainingSlots",
    "eventId"
  )
VALUES
  (
    '2023-02-17 00:00:00',
    '2023-02-17 23:59:59',
    999,
    1
  ),
  (
    '2023-02-18 10:00:00',
    '2023-02-18 11:20:00',
    5,
    2
  ),
  (
    '2023-02-18 10:50:00',
    '2023-02-18 12:10:00',
    5,
    2
  ),
  (
    '2023-02-18 11:40:00',
    '2023-02-18 13:00:00',
    5,
    2
  ),
  (
    '2023-02-18 13:10:00',
    '2023-02-18 14:30:00',
    5,
    2
  ),
  (
    '2023-02-18 14:00:00',
    '2023-02-18 15:20:00',
    5,
    2
  ),
  (
    '2023-02-18 14:50:00',
    '2023-02-18 16:10:00',
    5,
    2
  ),
  (
    '2023-02-18 15:40:00',
    '2023-02-18 17:00:00',
    5,
    2
  ),
  (
    '2023-02-18 16:30:00',
    '2023-02-18 17:50:00',
    5,
    2
  ),
  (
    '2023-02-18 17:20:00',
    '2023-02-18 18:40:00',
    5,
    2
  ),
  (
    '2023-02-18 18:50:00',
    '2023-02-18 20:10:00',
    5,
    2
  ),
  (
    '2023-02-18 19:40:00',
    '2023-02-18 21:00:00',
    5,
    2
  ),
  (
    '2023-02-18 20:30:00',
    '2023-02-18 21:50:00',
    5,
    2
  ),
  (
    '2023-02-18 21:20:00',
    '2023-02-18 22:40:00',
    5,
    2
  );
