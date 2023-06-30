require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
User.destroy_all
Business.destroy_all
Review.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('businesses')
ApplicationRecord.connection.reset_pk_sequence!('reviews')


puts "Creating users..."

User.create!(
  first_name: 'John', 
  last_name_initial: 'D',
  email: 'demo@user.io', 
  password: 'password'
)
User.create!(
  first_name: 'Emily', 
  last_name_initial: 'S',
  email: 'emily@user.io', 
  password: 'password'
)
User.create!(
  first_name: 'Olivia', 
  last_name_initial: 'T',
  email: 'olivia@user.io', 
  password: 'password'
)
User.create!(
  first_name: 'Ben', 
  last_name_initial: 'J',
  email: 'ben@user.io', 
  password: 'password'
)

puts "Created user!"

puts "Creating Japanese Businesses..."
#Create businesses
sushi_go_crazy = Business.create!({
  name: 'Sushi Go Crazy', 
  address: '123 Main St.',
  lat: '37.791994', 
  lng: '-122.409425',
  category: 'Japanese'
})
japantown_izakaya = Business.create!({
  name: 'Japantown Izakaya', 
  address: '345 Japan St.',
  lat: '37.783592', 
  lng: '-122.425436',
  category: 'Japanese'
})
omakase = Business.create!({
  name: 'Omakase', 
  address: '678 Noreiga St.',
  lat: '37.753680', 
  lng: '-122.487017',
  category: 'Japanese'
})
ramenagi = Business.create!({
  name: 'Ramenagi', 
  address: '112 Van Ness St.',
  lat: '37.791036', 
  lng: '-122.422178',
  category: 'Japanese'
})
tasty_boilingpot = Business.create!({
  name: 'Tasty BoilingPot', 
  address: '1111 Chinatown St.',
  lat: '37.793816', 
  lng: '-122.409548',
  category: 'Japanese'
})

puts "Creating Viet Restaurants"

pho_100 = Business.create!({
  name: 'Pho 100', 
  address: '100 Irving St.',
  lat: '37.763759', 
  lng: '-122.471272',
  category: 'Vietnamese'
})
pho_200 = Business.create!({
  name: 'Pho 200', 
  address: '200 Irving St.',
  lat: '37.763954', 
  lng: '-122.471261',
  category: 'Vietnamese'
})
bahn_me_likey = Business.create!({
  name: 'Bahn Me Likey', 
  address: '999 Noriega St.',
  lat: '37.753779', 
  lng: '-122.484874',
  category: 'Vietnamese'
})
spring_day = Business.create!({
  name: 'Spring Day', 
  address: '999 Real St.',
  lat: '37.760460', 
  lng: '-122.438344',
  category: 'Vietnamese'
})
golden_sun = Business.create!({
  name: 'Golden Sun', 
  address: '888 Sunny St.',
  lat: '37.757860', 
  lng: '-122.418900',
  category: 'Vietnamese'
})

puts "Creating Chinese Restaurants"

hotpot_delight = Business.create!({
  name: 'Hotpot Delight', 
  address: '1200 Mission St.',
  lat: '37.759151', 
  lng: '-122.418970',
  category: 'Chinese'
})
dumpling_home = Business.create!({
  name: 'Dumpling Home', 
  address: '888 Home St.',
  lat: '37.753002', 
  lng: '-122.430226',
  category: 'Chinese'
})
express_panda = Business.create!({
  name: 'Express Panda', 
  address: '222 Express St.',
  lat: '37.757860', 
  lng: '-122.418900',
  category: 'Chinese'
})
dim_sum_house = Business.create!({
  name: 'Dim Sum House', 
  address: '5012 Dimsum St.',
  lat: '37.785891', 
  lng: '-122.417356',
  category: 'Chinese'
})
sichuan_spice = Business.create!({
  name: 'Sichuan Spice', 
  address: '1000 Spicy St.',
  lat: '37.785874', 
  lng: '-122.435967',
  category: 'Chinese'
})

puts "Creating American Restaurants"

pizza = Business.create!({
  name: 'Pizza Pizza Pizza!', 
  address: '2000 Tomato St.',
  lat: '37.794741', 
  lng: '-122.414903',
  category: 'American'
})
how_dawgs = Business.create!({
  name: 'Hot Dawgs', 
  address: '9999 Corgi St.',
  lat: '37.787416', 
  lng: '-122.409750',
  category: 'American'
})
smash_burger = Business.create!({
  name: 'Smash Burger', 
  address: '1000 Spicy St.',
  lat: '37.790943', 
  lng: '-122.440154',
  category: 'American'
})
ny_pizza = Business.create!({
  name: 'NY Pizza', 
  address: '321 New York St.',
  lat: '37.783339', 
  lng: '-122.453228',
  category: 'American'
})
johns_diner = Business.create!({
  name: 'Johns Diner', 
  address: '400 Fast St.',
  lat: '37.759186', 
  lng: '-122.407192',
  category: 'American'
})

puts "Attaching AWS images..."

aws_image_urls = [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/sushi1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/sushi2.jpg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/sushi3.jpeg',
]

if sushi_go_crazy.present?
  aws_image_urls.each_with_index do |image_url, index|
    sushi_go_crazy.photos.attach(
      io: URI.open(image_url),
      filename: "sushi#{index + 1}.#{image_url.split('.').last}"
    )
  end
  puts "AWS image successful"
else
  puts "Could not find business"
end

japantown_urls = [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/izakaya1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/izakaya2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/izakaya3.jpeg',
]

japantown_urls.each_with_index do |image_url, index|
  japantown_izakaya.photos.attach(
    io: URI.open(image_url),
    filename: "izakaya#{index + 1}.jpeg"
  )
end

businesses = [omakase, ramenagi, tasty_boilingpot, pho_100, pho_200, bahn_me_likey, spring_day, golden_sun, hotpot_delight, dumpling_home, express_panda, dim_sum_house, sichuan_spice, pizza, how_dawgs, smash_burger, ny_pizza, johns_diner]
aws_image_urls_list = [
  [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/omakase1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/omakase2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/omakase3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/ramenagi1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/ramenagi2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/ramenagi3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/tastypot1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/tastypot2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/tastypot3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/pho100_1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/pho100_2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/pho100_3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/pho200_1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/pho200_2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/pho200_3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/bahn1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/bahn2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/bahn3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/spring1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/spring2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/spring3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/golden1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/golden2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/golden3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/hotpot1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/hotpot2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/hotpot3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/dumpling1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/dumpling2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/dumpling3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/panda1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/panda2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/panda3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/dimsum1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/dimsum2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/dimsum3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/sichuan1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/sichuan2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/sichuan3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/pizza1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/pizza2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/pizza3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/hotdog1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/hotdog2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/hotdog3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/smashb1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/smashb2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/smashb3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/nypizza1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/nypizza2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/nypizza3.jpeg',
  ], [
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/diner1.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/diner2.jpeg',
  'https://pley1-seeds.s3.us-west-1.amazonaws.com/diner3.jpeg',
]]

businesses.zip(aws_image_urls_list).each do |business, aws_image_urls|
  aws_image_urls.each_with_index do |image_url, index|
    business.photos.attach(
      io: URI.open(image_url),
      filename: "#{business.name.downcase.gsub(' ', '_')}#{index + 1}.jpeg"
    )
  end
end
puts "AWS images attached successfully"

puts "Creating a review..."

john = User.find_by(first_name: 'John', last_name_initial: 'D')
emily = User.find_by(first_name: 'Emily', last_name_initial: 'S')
olivia = User.find_by(first_name: 'Olivia', last_name_initial: 'T')
ben = User.find_by(first_name: 'Ben', last_name_initial: 'J')

sushi_go_crazy = Business.find_by(name: 'Sushi Go Crazy')
pho_200 = Business.find_by(name: 'Omakase')
sichuan_spice = Business.find_by(name: 'Sichuan Spice')
johns_diner = Business.find_by(name: 'Johns Diner')

Review.create!(
  body: 'Delicious sushi, great service I would come back here anytime of the week to go crazy for their sushi!',
  rating: 5,
  user_id: john.id,
  business_id: sushi_go_crazy.id
)
Review.create!(
  body: 'This is my 2nd time coming here and the food here is SO DELICIOUS, I cannot stop coming here!',
  rating: 5,
  user_id: john.id,
  business_id: sushi_go_crazy.id
)
Review.create!(
  body: 'This is my 3rd time coming here but the fish was not so fresh this time... I feel like the quality has gone down.',
  rating: 3,
  user_id: john.id,
  business_id: sushi_go_crazy.id
)

Review.create!(
  body: 'Pho 200 offers a cozy ambiance, friendly staff, and delicious pho. The flavorful broth, tender meat, and perfectly cooked noodles made every bite a delight. The menu has a variety of tasty Vietnamese dishes, and the service was exceptional. Highly recommended for an authentic pho experience!',
  rating: 3,
  user_id: emily.id,
  business_id: pho_200.id
)
Review.create!(
  body: 'Sichuan Spice took me on a spicy adventure! The flavors were bold and packed a punch, just as expected from Sichuan cuisine. However, I found some dishes to be overly spicy for my taste. The service was decent, and the ambiance was comfortable. It\'s a great place to visit if you love the heat!',
  rating: 4,
  user_id: emily.id,
  business_id: sichuan_spice.id
)
Review.create!(
  body: 'Johns Diner serves up classic comfort food that hits the spot. The menu offers all the staples you\'d expect, from burgers to milkshakes. While the food was satisfying, it didn\'t leave a lasting impression. The service was friendly, and the diner had a cozy, nostalgic vibe. It\'s a decent spot for a casual meal when you\'re craving familiar flavors',
  rating: 4,
  user_id: emily.id,
  business_id: johns_diner.id
)

Review.create!(
  body: 'Delicious Vietnamese Cuisine! Pho 200 offers a wide range of flavorful dishes that are a treat for the taste buds. The pho was aromatic and packed with authentic flavors. The service was attentive, and the restaurant had a cozy ambiance. Highly recommended for a satisfying Vietnamese dining experience',
  rating: 4,
  user_id: olivia.id,
  business_id: pho_200.id
)
Review.create!(
  body: 'Spice Lover\'s Paradise! Sichuan Spice delivered an explosion of flavors that left me wanting more. The dishes were perfectly spiced, showcasing the boldness of Sichuan cuisine. The service was prompt, and the restaurant had a vibrant atmosphere. If you enjoy a fiery kick in your food, this is the place to be!',
  rating: 5,
  user_id: olivia.id,
  business_id: sichuan_spice.id
)
Review.create!(
  body: 'Classic Comforts Done Right! Johns Diner is the go-to spot for satisfying your cravings. The menu offers all the timeless favorites, from juicy burgers to creamy milkshakes. The food was prepared with care and the service was friendly. The diner had a cozy and nostalgic ambiance that added to the overall experience. A must-visit for comfort food enthusiasts.',
  rating: 5,
  user_id: olivia.id,
  business_id: johns_diner.id
)

Review.create!(
  body: 'Disappointing Experience. Pho 200 fell short of expectations. The pho lacked flavor and the overall dining experience was underwhelming. The service was lacking and the ambiance was nothing special. Unfortunately, I cannot recommend this place based on my experience.',
  rating: 1,
  user_id: ben.id,
  business_id: pho_200.id
)
Review.create!(
  body: 'Unpleasantly Spicy. Sichuan Spice was a challenge to handle. The dishes were excessively spicy, making it difficult to appreciate the flavors. The service was average and the atmosphere was nothing remarkable. If you have a low tolerance for heat, I would suggest considering other options.',
  rating: 1,
  user_id: ben.id,
  business_id: sichuan_spice.id
)
Review.create!(
  body: 'Subpar Food Quality. John\'s Diner left much to be desired. The food lacked freshness and tasted below average. The service was mediocre and the overall experience was disappointing. I would recommend exploring other dining options for better quality and taste.',
  rating: 1,
  user_id: ben.id,
  business_id: johns_diner.id
)

puts "Created review!"

# 9.times do
#   Business.create!({
#     name: Faker::Company.name,
#     address: Faker::Address.street_address,
#     latitude: Faker::Address.latitude,
#     longitude: Faker::Address.longitude,
#     category: Faker::Restaurant.type
#   })
# end


puts "Done!"