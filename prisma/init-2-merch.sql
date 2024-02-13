-- Insert Sample Data
-- Insert Sample Merch
INSERT INTO
  "Merch" (id, name, variations, stock)
VALUES
  (1, 'Shirt', ARRAY['S', 'M', 'L', 'XL'], 999),
  (2, 'Lanyard', ARRAY['Yellow', 'Black'], 999),
  (3, 'Playing Cards', ARRAY['Standard'], 50);

INSERT INTO
  "MerchBundle" (id, name, images, stock, price)
VALUES
  (
    1,
    'Shirt',
    ARRAY[
      'https://utfs.io/f/b1669d73-ed19-46bd-9371-48e564dfe80f-xd3cgk.png',
      'https://utfs.io/f/197ee4e7-bef4-417a-afd1-1a8b7009b4ea-v9bdl0.png'
    ],
    999,
    10.00
  ),
  (
    2,
    'Lanyard',
    ARRAY[
      'https://utfs.io/f/8757c225-27eb-45a7-8911-b3e08cf8cc78-880brd.png',
      'https://utfs.io/f/8e95fe67-65f5-49cb-b6b2-88d0e22ef08b-v0k004.png'
    ],
    999,
    8.00
  ),
  (
    3,
    'Playing Cards',
    ARRAY[
      'https://utfs.io/f/1ad1bc5b-f8be-4941-a9f6-6d271980c1b3-fau8ff.png'
    ],
    999,
    15.00
  );

INSERT INTO
  "BundleItem" ("merchId", "merchBundleId")
VALUES
  (1, 1),
  (2, 2),
  (3, 3);
