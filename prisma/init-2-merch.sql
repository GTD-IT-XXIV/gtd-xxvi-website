-- Insert Sample Data
-- Insert Sample Merch
INSERT INTO
  "Merch" (id, name, variations, stock)
VALUES
  (1, 'Shirt', ARRAY['S', 'M', 'L', 'XL'], 999),
  (
    2,
    'Reversible Lanyard',
    ARRAY['Yellow/Black'],
    71
  ),
  (3, 'Playing Cards', ARRAY['Standard'], 14);

INSERT INTO
  "MerchBundle" (id, name, images, stock, price)
VALUES
  (
    1,
    'Shirt',
    ARRAY[
      'https://utfs.io/f/b969029c-f4a0-42cd-8f7f-a52a41076585-v9bdl0.png',
      'https://utfs.io/f/0e3be7a6-2be6-454b-ab1a-327f9faedf8d-xd3cgk.png',
      'https://utfs.io/f/94f9356b-e18f-48b0-81f2-8086b5c7c2d8-xcsb7e.png'
    ],
    999,
    12.50
  ),
  (
    2,
    'Reversible Lanyard',
    ARRAY[
      'https://utfs.io/f/8e95fe67-65f5-49cb-b6b2-88d0e22ef08b-v0k004.png',
      'https://utfs.io/f/8757c225-27eb-45a7-8911-b3e08cf8cc78-880brd.png'
    ],
    71,
    3.00
  ),
  (
    3,
    'Playing Cards',
    ARRAY[
      'https://utfs.io/f/f3172f7a-6292-4dd4-8ff4-f2044eb86e76-fau8ff.png'
    ],
    14,
    8.00
  );

INSERT INTO
  "BundleItem" ("merchId", "merchBundleId")
VALUES
  (1, 1),
  (2, 2),
  (3, 3);
