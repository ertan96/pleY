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
Business.create!({
  name: 'Japantown Izakaya', 
  address: '345 Japan St.',
  lat: '37.783592', 
  lng: '-122.425436',
  category: 'Japanese'
})
Business.create!({
  name: 'Omakase', 
  address: '678 Noreiga St.',
  lat: '37.753680', 
  lng: '-122.487017',
  category: 'Japanese'
})
Business.create!({
  name: 'Ramenagi', 
  address: '112 Van Ness St.',
  lat: '37.791036', 
  lng: '-122.422178',
  category: 'Japanese'
})
Business.create!({
  name: 'Tasty BoilingPot', 
  address: '1111 Chinatown St.',
  lat: '37.793816', 
  lng: '-122.409548',
  category: 'Japanese'
})

puts "Creating Viet Restaurants"

Business.create!({
  name: 'Pho 100', 
  address: '100 Irving St.',
  lat: '37.763759', 
  lng: '-122.471272',
  category: 'Vietnamese'
})
Business.create!({
  name: 'Pho 200', 
  address: '200 Irving St.',
  lat: '37.763954', 
  lng: '-122.471261',
  category: 'Vietnamese'
})
Business.create!({
  name: 'Bahn Me Likey', 
  address: '999 Noriega St.',
  lat: '37.753779', 
  lng: '-122.484874',
  category: 'Vietnamese'
})
Business.create!({
  name: 'Spring Day', 
  address: '999 Real St.',
  lat: '37.760460', 
  lng: '-122.438344',
  category: 'Vietnamese'
})
Business.create!({
  name: 'Golden Sun', 
  address: '888 Sunny St.',
  lat: '37.757860', 
  lng: '-122.418900',
  category: 'Vietnamese'
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

puts "Creating a review..."

john = User.find_by(first_name: 'John', last_name_initial: 'D')
sushi_go_crazy = Business.find_by(name: 'Sushi Go Crazy')

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