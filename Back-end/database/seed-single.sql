INSERT INTO products (
  category_id, name, description, category, price, original_price,
  rating, review_count, sold_count, seller,
  badges, images, colors, sizes, delivery_info
) VALUES
(8,'Astra Margarine 250g','Creamy and smooth margarine perfect for baking and cooking.','groceries',2.49,3.49,4.6,4800,29000,'Astra',
ARRAY['best-seller','popular'],
ARRAY['https://supersavings.lk/wp-content/uploads/2021/01/astra-fat-spread-250g.png'],
ARRAY['N/A'],
ARRAY['250g'],
'Free shipping • 2-4 days');
