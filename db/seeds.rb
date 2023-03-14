require 'faker'

tennis_level = [
    1.5,
    2.0,
    2.5,
    3.0,
    3.5,
    4.0,
    4.5
]

play_preference = [
    "Singles",
    "Doubles",
    "Singles and Doubles"
]

court_preference = [
    "hard",
    "clay",
    "grass",
    "hard and clay",
    "hard and grass",
    "clay and grass",
    "all surfaces"
]

puts 'deleting users/reservations/parks/courts/ratings ❌'
User.destroy_all
Reservation.destroy_all
Park.destroy_all
Court.destroy_all
Rating.destroy_all
puts 'seeding fresh data'

puts 'seeding users 👤'
User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    phone: Faker::Number.number(digits: 10),
    age: Faker::Number.within(range: 18..100),
    email: Faker::Internet.safe_email,
    tennis_level: tennis_level.sample,
    play_preference: play_preference.sample,
    court_preference: court_preference.sample,
    year_started: Faker::Number.within(range: 1950..2023),
    password: Faker::Internet.password(min_length: 8),
    user_image: Faker::Avatar.image
)

puts 'done seeding users 👤'

puts 'seeding parks 🌳'
Park.create(
    name: "Ted Rhodes Park",
    park_image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rent.com%2Ftennessee%2Fnashville-apartments%2F505-nashville-4-100065707&psig=AOvVaw1eHgWeJNGMo3MQSs7iYdxL&ust=1678852205238000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJCjuvzB2v0CFQAAAAAdAAAAABAE",
    address: "1901 Ed Temple Blvd., Nashville, TN 37228",
    neighborhood: "North Nashville",
    court_type: "hard",
    lights: true,
    number_of_courts: 2,
    price_per_hour: 5,
    open_time: 10,
    close_time: 20
)
puts 'done seeding parks 🌳'

puts 'creating courts 🎾'
Court.create(
    park_id: Park.all.sample.id,
    court_number: Faker::Number.within(range 1..4)
)
puts 'done creating courts 🎾'

puts 'seeding reservations 📆'
Reservation.create(
    user_id: User.all.sample.id,
    park_id: Restaurant.all.sample.id,
    court_id: Court.all.sample.id,
    date: Faker::Date.between(from: '2023-03-13', to: '2023-03-17'),
    time: Faker::Number.within(range: 10..19),
    duration: Faker::Number.within(range: 1..3),
)
puts 'done seeding reservations 📆'

puts 'creating ratings ⭐️'
Court.create(
    user_id: User.all.sample.id,
    park_id: Park.all.sample.id,
    rating: Faker::Number.within(range 1..5)
)
puts 'done creating ratings ⭐️'