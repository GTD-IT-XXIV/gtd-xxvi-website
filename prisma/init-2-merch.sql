-- Insert Sample Data
-- Insert Sample Merch
INSERT INTO
  "Merch" (id, name, variations, stock)
VALUES
  (
    1,
    'Shirt',
    ARRAY['XS', 'S', 'M', 'L', 'XL', '2XL'],
    999
  ),
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
      'https://ddjhntpphokusdgpaxuv.supabase.co/storage/v1/object/public/gtd-xxvi-website/merch-shirt-front.png',
      'https://ddjhntpphokusdgpaxuv.supabase.co/storage/v1/object/public/gtd-xxvi-website/merch-shirt-back.png',
      'https://ddjhntpphokusdgpaxuv.supabase.co/storage/v1/object/public/gtd-xxvi-website/merch-shirt-size.png'
    ],
    999,
    12.50
  ),
  (
    2,
    'Reversible Lanyard',
    ARRAY[
      'https://ddjhntpphokusdgpaxuv.supabase.co/storage/v1/object/public/gtd-xxvi-website/merch-lanyard-yellow.png',
      'https://ddjhntpphokusdgpaxuv.supabase.co/storage/v1/object/public/gtd-xxvi-website/merch-lanyard-black.png'
    ],
    71,
    3.00
  ),
  (
    3,
    'Playing Cards',
    ARRAY[
      'https://ddjhntpphokusdgpaxuv.supabase.co/storage/v1/object/public/gtd-xxvi-website/merch-cards.png'
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
