-- MegaShop Product Seed Data (Task 4 – Step 5.2)

/* ===================== ELECTRONICS ===================== */

INSERT INTO products (
  category_id, name, description, category, price, original_price,
  rating, review_count, sold_count, seller,
  badges, images, colors, sizes, delivery_info
) VALUES
(1,'Wireless Bluetooth Headphones Pro',
'Noise cancelling headphones with 30hr battery life, perfect for music lovers and travelers.',
'electronics',29.99,59.99,4.7,1248,8900,'TechGadgets',
ARRAY['best-seller','free-ship'],
ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
ARRAY['Black','White','Blue'],
ARRAY['One Size'],
'Free shipping • 1-3 days'
),

(1,'Smart Watch Series 6 - Fitness Tracker',
'Advanced fitness tracker with heart rate monitoring, GPS, and waterproof design.',
'electronics',89.99,149.99,4.9,892,5600,'TechInnovate',
ARRAY['best-seller','new','free-ship'],
ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
ARRAY['Black','Silver','Rose Gold'],
ARRAY['S','M','L'],
'Free shipping • 2-4 days'
),

(1,'4K Ultra HD Smart TV 55"',
'Crystal clear 4K television with smart features and built-in streaming apps.',
'electronics',399.99,599.99,4.8,456,2300,'HomeElectronics',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'],
ARRAY['Black'],
ARRAY['55-inch'],
'Free shipping • 3-7 days'
),

(1,'Gaming Laptop RTX 4080',
'High-performance gaming laptop with RTX 4080 graphics card and 32GB RAM.',
'electronics',1499.99,1999.99,4.9,234,890,'GameTech',
ARRAY['best-seller','new'],
ARRAY['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'],
ARRAY['Black','Gray'],
ARRAY['15-inch','17-inch'],
'Free shipping • 2-5 days'
);

INSERT INTO products (
  category_id, name, description, category, price, original_price,
  rating, review_count, sold_count, seller,
  badges, images, colors, sizes, delivery_info
) VALUES
(1,'Wireless Earbuds Pro',
'True wireless earbuds with active noise cancellation.',
'electronics',79.99,129.99,4.6,678,4500,'AudioPro',
ARRAY['best-seller','free-ship'],
ARRAY['https://images.unsplash.com/photo-1590658165737-15a047b8b5e5?w=400'],
ARRAY['White','Black','Blue'],
ARRAY['One Size'],
'Free shipping • 2-4 days'
),

(1,'Portable Bluetooth Speaker',
'Waterproof portable speaker with 20-hour battery life.',
'electronics',49.99,79.99,4.4,789,6700,'SoundMaster',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400'],
ARRAY['Black','Red','Blue'],
ARRAY['One Size'],
'Free shipping • 2-4 days'
),

(1,'Tablet 10.1 inch with Keyboard',
'10.1 inch tablet with detachable keyboard and stylus support.',
'electronics',249.99,349.99,4.5,345,3200,'TabletWorld',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'],
ARRAY['Silver','Gray'],
ARRAY['10.1-inch'],
'Free shipping • 3-6 days'
),

(1,'Digital Camera 24MP',
'24MP digital camera with 4K video recording.',
'electronics',299.99,449.99,4.7,234,1800,'CameraPro',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400'],
ARRAY['Black'],
ARRAY['Standard'],
'Free shipping • 3-8 days'
);

/* ===================== BEAUTY ===================== */

INSERT INTO products (
  category_id, name, description, category, price, original_price,
  rating, review_count, sold_count, seller,
  badges, images, colors, sizes, delivery_info
) VALUES
(2,'12pcs Mini Lipstick Set with Eyeshadow',
'Portable makeup kit with moisturizing lip color and long-lasting eye shadow.',
'beauty',1.09,9.99,4.5,299,418,'BeautyStore Pro',
ARRAY['best-seller','free-ship'],
ARRAY['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'],
ARRAY['Red Set','Pink Set','Nude Set'],
ARRAY['12 pcs'],
'Free shipping • 3-5 days'
),

(2,'Perfume Collection Set',
'Set of 5 premium fragrances for different occasions.',
'beauty',29.99,49.99,4.8,567,3400,'FragranceWorld',
ARRAY['best-seller','new'],
ARRAY['https://images.unsplash.com/photo-1541643600914-78b084683601?w=400'],
ARRAY['Mixed'],
ARRAY['5 x 10ml'],
'Free shipping • 2-4 days'
),

(2,'Makeup Brush Set - 12 Pieces',
'Professional makeup brush set with carrying case.',
'beauty',19.99,39.99,4.6,456,5600,'BeautyTools',
ARRAY['best-seller','free-ship'],
ARRAY['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400'],
ARRAY['Pink','Black','Rose Gold'],
ARRAY['12 pcs'],
'Free shipping • 3-6 days'
);

INSERT INTO products VALUES
(2,'Skincare Routine Set',
'Complete skincare routine with cleanser and moisturizer.',
'beauty',39.99,69.99,4.7,789,2900,'SkinCarePro',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=400'],
ARRAY['White'],
ARRAY['Full Set'],
'Free shipping • 2-5 days'
),

(2,'Hair Dryer Professional',
'2000W professional hair dryer with heat control.',
'beauty',34.99,59.99,4.4,234,4500,'HairCare',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1522338242990-e8a0c13f8c3f?w=400'],
ARRAY['Black','Pink'],
ARRAY['Standard'],
'Free shipping • 3-7 days'
),

(2,'Nail Polish Set - 24 Colors',
'24-color nail polish set with top coat.',
'beauty',14.99,29.99,4.3,678,7800,'NailStudio',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1607779094035-235ea89f32d7?w=400'],
ARRAY['Rainbow'],
ARRAY['24 pcs'],
'Free shipping • 2-4 days'
);

/* ===================== FASHION ===================== */

INSERT INTO products (
  category_id, name, description, category, price, original_price,
  rating, review_count, sold_count, seller,
  badges, images, colors, sizes, delivery_info
) VALUES
(3,'Women''s Platform Sandals - Summer',
'Comfortable platform sandals for summer outfits.',
'fashion',15.99,32.99,4.3,567,3200,'FashionTrend',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400'],
ARRAY['Black','Brown','White'],
ARRAY['6','7','8','9'],
'Free shipping • 3-6 days'
),

(3,'Designer Handbag - Leather Tote',
'Genuine leather tote bag with multiple compartments.',
'fashion',49.99,99.99,4.4,789,4300,'LuxuryBags',
ARRAY['best-seller','free-ship'],
ARRAY['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
ARRAY['Black','Brown','Camel'],
ARRAY['Small','Medium','Large'],
'Free shipping • 4-8 days'
),

(3,'Men''s Running Shoes',
'Lightweight running shoes with cushioning technology.',
'fashion',39.99,69.99,4.6,890,5600,'SportShoes',
ARRAY['best-seller','free-ship'],
ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
ARRAY['Black/Red','Blue/White','Gray'],
ARRAY['7-12'],
'Free shipping • 2-4 days'
);

INSERT INTO products VALUES
(3,'Women Summer Dress',
'Floral summer dress with breathable fabric.',
'fashion',24.99,49.99,4.5,456,6700,'DressCollection',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400'],
ARRAY['Floral','Red','Blue'],
ARRAY['S','M','L','XL'],
'Free shipping • 3-5 days'
),

(3,'Men Leather Jacket',
'Genuine leather jacket with classic design.',
'fashion',79.99,149.99,4.7,234,2100,'LeatherWorks',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'],
ARRAY['Black','Brown'],
ARRAY['M','L','XL'],
'Free shipping • 4-10 days'
),

(3,'Women Jewelry Set',
'Necklace, earrings and bracelet set.',
'fashion',14.99,29.99,4.4,678,8900,'JewelryBox',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400'],
ARRAY['Gold','Silver'],
ARRAY['One Size'],
'Free shipping • 2-4 days'
);

/* ===================== HOME ===================== */

INSERT INTO products (
  category_id, name, description, category, price, original_price,
  rating, review_count, sold_count, seller,
  badges, images, colors, sizes, delivery_info
) VALUES
(4,'Coffee Capsule Machine - Espresso',
'Best-selling coffee machine with espresso function.',
'home',43.79,61.77,4.8,85,112,'Kitchen Essentials',
ARRAY['best-seller','new'],
ARRAY['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'],
ARRAY['Black','Silver'],
ARRAY['Standard'],
'Free shipping • 2-4 days'
),

(4,'Air Purifier with HEPA Filter',
'Smart air purifier for rooms up to 500 sq ft.',
'home',79.99,129.99,4.7,432,2900,'HomeCare',
ARRAY['best-seller','new'],
ARRAY['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400'],
ARRAY['White','Black'],
ARRAY['Standard'],
'Free shipping • 2-5 days'
);

INSERT INTO products VALUES
(4,'LED Desk Lamp',
'Adjustable LED desk lamp with brightness control.',
'home',19.99,34.99,4.4,456,5600,'HomeLighting',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400'],
ARRAY['White','Black'],
ARRAY['Standard'],
'Free shipping • 2-4 days'
),

(4,'Kitchen Knife Set - 8 Pieces',
'Professional stainless steel knife set.',
'home',49.99,89.99,4.7,234,3200,'KitchenPro',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
ARRAY['Silver'],
ARRAY['8 pcs'],
'Free shipping • 2-4 days'
);

/* ===================== SPORTS ===================== */

INSERT INTO products (
  category_id, name, description, category, price, original_price,
  rating, review_count, sold_count, seller,
  badges, images, colors, sizes, delivery_info
) VALUES
(5,'Dumbbell Set - Adjustable',
'Adjustable dumbbell set from 5kg to 25kg.',
'sports',49.99,89.99,4.7,456,3400,'FitnessGear',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=400'],
ARRAY['Black'],
ARRAY['Adjustable'],
'Free shipping • 3-8 days'
),

(5,'Basketball - Official Size',
'Official size basketball for indoor and outdoor use.',
'sports',24.99,39.99,4.5,234,4500,'SportBall',
ARRAY['best-seller','free-ship'],
ARRAY['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'],
ARRAY['Orange'],
ARRAY['Size 7'],
'Free shipping • 2-4 days'
);

INSERT INTO products VALUES
(5,'Tennis Racket Professional',
'Carbon fiber tennis racket.',
'sports',59.99,99.99,4.6,123,1800,'TennisPro',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400'],
ARRAY['Black'],
ARRAY['Standard'],
'Free shipping • 3-7 days'
),

(5,'Cycling Helmet Safety',
'Safety-certified cycling helmet.',
'sports',34.99,59.99,4.8,456,5600,'CycleSafe',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1530700134621-9d0217c64f7c?w=400'],
ARRAY['Red','Blue'],
ARRAY['M','L'],
'Free shipping • 2-4 days'
);

/* ===================== TOYS===================== */

INSERT INTO products VALUES
(6,'Remote Control Racing Car',
'High-speed remote control toy car.',
'toys',29.99,49.99,4.6,320,2100,'ToyWorld',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1594787317396-21a7eff7f4e4?w=400'],
ARRAY['Red','Blue'],
ARRAY['One Size'],
'Free shipping • 3-5 days'
),

(7,'Bestselling Novel - Paperback',
'Popular fiction novel.',
'books',12.99,19.99,4.8,890,12000,'BookStore',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'],
ARRAY['N/A'],
ARRAY['Paperback'],
'Free shipping • 3-5 days'
),

(8,'Organic Grocery Essentials Pack',
'Daily organic grocery essentials.',
'groceries',39.99,59.99,4.7,650,7800,'FreshMart',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
ARRAY['Mixed'],
ARRAY['Pack'],
'Free shipping • 2-4 days'
);

INSERT INTO products (
 category_id,name,description,category,price,original_price,
 rating,review_count,sold_count,seller,
 badges,images,colors,sizes,delivery_info
) VALUES
(6,'Remote Control Racing Car','High-speed RC car with rechargeable battery.','toys',29.99,49.99,4.6,540,4200,'ToyWorld',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1594787317396-21a7eff7f4e4?w=400'],
ARRAY['Red','Blue'],ARRAY['Standard'],'Free shipping • 3-5 days'),

(6,'Building Blocks Set 500 pcs','Creative blocks to improve kids imagination.','toys',19.99,34.99,4.7,680,5100,'KidsZone',
ARRAY['free-ship'],
ARRAY['https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=400'],
ARRAY['Multi'],ARRAY['500 pcs'],'Free shipping • 3-6 days'),

(6,'Kids Learning Tablet','Educational tablet for early learning.','toys',39.99,59.99,4.5,410,2800,'EduPlay',
ARRAY['new'],
ARRAY['https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400'],
ARRAY['Blue'],ARRAY['Standard'],'Free shipping • 2-4 days'),

(6,'Toy Train Set','Classic toy train with tracks.','toys',24.99,39.99,4.4,360,1900,'PlayTime',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400'],
ARRAY['Multi'],ARRAY['Standard'],'Free shipping • 3-5 days'),

(6,'Doll House Miniature','Wooden doll house with furniture.','toys',44.99,69.99,4.6,290,1500,'HappyKids',
ARRAY['new'],
ARRAY['https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400'],
ARRAY['Pink'],ARRAY['Standard'],'Free shipping • 4-6 days'),

(6,'Puzzle Game 1000 Pieces','Brain-stimulating puzzle game.','toys',14.99,24.99,4.5,520,3200,'PuzzleLand',
ARRAY['free-ship'],
ARRAY['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'],
ARRAY['Multi'],ARRAY['1000 pcs'],'Free shipping • 3-5 days'),

(6,'Kids Scooter','Adjustable height kids scooter.','toys',49.99,79.99,4.7,610,4100,'RideOn',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400'],
ARRAY['Red','Blue'],ARRAY['Adjustable'],'Free shipping • 4-7 days');

/* =====================BOOK===================== */
INSERT INTO products (
 category_id,name,description,category,price,original_price,
 rating,review_count,sold_count,seller,
 badges,images,colors,sizes,delivery_info
) VALUES
(7,'Atomic Habits','Best-selling self improvement book.','books',14.99,24.99,4.9,12000,200000,'BookStore',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'],
ARRAY['N/A'],ARRAY['Paperback'],'Free shipping • 2-4 days'),

(7,'Clean Code','Agile software craftsmanship handbook.','books',29.99,49.99,4.8,8500,95000,'TechBooks',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400'],
ARRAY['N/A'],ARRAY['Paperback'],'Free shipping • 3-5 days'),

(7,'Rich Dad Poor Dad','Personal finance classic.','books',12.99,19.99,4.7,15000,180000,'FinanceReads',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400'],
ARRAY['N/A'],ARRAY['Paperback'],'Free shipping • 2-4 days'),

(7,'Think Like a Programmer','Problem-solving guide for developers.','books',21.99,34.99,4.6,4200,36000,'DevBooks',
ARRAY['free-ship'],
ARRAY['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'],
ARRAY['N/A'],ARRAY['Paperback'],'Free shipping • 3-5 days'),

(7,'Deep Work','Rules for focused success.','books',16.99,27.99,4.7,9800,110000,'MindsetBooks',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'],
ARRAY['N/A'],ARRAY['Paperback'],'Free shipping • 2-4 days'),

(7,'Introduction to Algorithms','Computer science textbook.','books',69.99,99.99,4.8,6200,45000,'AcademicPress',
ARRAY['new'],
ARRAY['https://images.unsplash.com/photo-1589998059171-988d887df646?w=400'],
ARRAY['N/A'],ARRAY['Hardcover'],'Free shipping • 4-6 days');

/* =====================Grocery===================== */
INSERT INTO products (
 category_id,name,description,category,price,original_price,
 rating,review_count,sold_count,seller,
 badges,images,colors,sizes,delivery_info
) VALUES
(8,'Organic Basmati Rice 5kg','Premium quality basmati rice.','groceries',12.99,18.99,4.5,2100,18000,'FreshMart',
ARRAY['free-ship'],
ARRAY['https://images.unsplash.com/photo-1604909053195-14aefae3c9a3?w=400'],
ARRAY['N/A'],ARRAY['5kg'],'Free shipping • 2-3 days'),

(8,'Extra Virgin Olive Oil 1L','Cold pressed olive oil.','groceries',9.99,14.99,4.6,3400,22000,'GroceryHub',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400'],
ARRAY['N/A'],ARRAY['1L'],'Free shipping • 2-4 days'),

(8,'Whole Wheat Flour 5kg','Stone-ground whole wheat flour.','groceries',6.99,10.99,4.4,2900,25000,'DailyNeeds',
ARRAY['free-ship'],
ARRAY['https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400'],
ARRAY['N/A'],ARRAY['5kg'],'Free shipping • 2-3 days'),

(8,'Organic Honey 500g','Pure natural honey.','groceries',8.99,13.99,4.7,4100,30000,'NatureFoods',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1587049352846-4a222e784c5c?w=400'],
ARRAY['N/A'],ARRAY['500g'],'Free shipping • 2-4 days'),

(8,'Breakfast Oats 1kg','Healthy rolled oats.','groceries',4.99,7.99,4.6,5200,45000,'HealthStore',
ARRAY['free-ship'],
ARRAY['https://images.unsplash.com/photo-1585238342028-4bbc1cfc8f9b?w=400'],
ARRAY['N/A'],ARRAY['1kg'],'Free shipping • 2-3 days'),

(8,'Green Tea Bags 100 pcs','Antioxidant rich green tea.','groceries',5.99,9.99,4.5,6100,38000,'TeaHouse',
ARRAY['best-seller'],
ARRAY['https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400'],
ARRAY['N/A'],ARRAY['100 pcs'],'Free shipping • 2-4 days');
