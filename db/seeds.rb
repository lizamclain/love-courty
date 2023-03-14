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

puts 'seeding 100 users 👤'
100.times do User.create(
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
end

puts 'done seeding users 👤'

puts 'seeding 15 parks 🌳'
Park.create(
    name: "Ted Rhodes Park",
    park_image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rent.com%2Ftennessee%2Fnashville-apartments%2F505-nashville-4-100065707&psig=AOvVaw1eHgWeJNGMo3MQSs7iYdxL&ust=1678852205238000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJCjuvzB2v0CFQAAAAAdAAAAABAE",
    address: "1901 Ed Temple Blvd., Nashville, TN 37228",
    directions: "https://www.google.com/maps/dir//Ted+Rhodes+Park,+1901+Ed+Temple+Blvd,+Nashville,+TN+37228/@36.1901112,-86.8291332,15z/data=!4m9!4m8!1m0!1m5!1m1!1s0x88646732db3e9b41:0x738093040d3d6dec!2m2!1d-86.8257994!2d36.1845391!3e0",
    neighborhood: "North Nashville",
    court_type: "hard",
    lights: true,
    number_of_courts: 2,
    price_per_hour: 5,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Sevier Park",
    park_image: "https://lh3.googleusercontent.com/p/AF1QipOvRtsjh1Mpg06ZZc98kJ-4p6C1vn1w3l_yL6-B=s680-w680-h510",
    address: "1000 Clayton Ave, Nashville, TN 37204",
    directions: "https://www.google.com/maps/dir//Sevier+Park+Tennis+Courts,+Clayton+Avenue,+Nashville,+TN/@36.1193694,-86.859047,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0x8864643103110c3d:0x75a7cf20f3dab6b9!2m2!1d-86.789179!2d36.119251!3e0",
    neighborhood: "12 South",
    court_type: "hard",
    lights: false,
    number_of_courts: 2,
    price_per_hour: 6,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Bordeaux Gardens",
    park_image: "https://s3-media0.fl.yelpcdn.com/bphoto/ghwNF0lk6vgXGTBP8H9u7A/348s.jpg",
    address: "1490 Snell Blvd, Nashville, TN 37218",
    directions: "https://www.google.com/maps/dir//Bordeaux+Gardens+Park,+Snell+Boulevard,+Nashville,+TN/@36.1785724,-86.9091575,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0x886460df7e9ae637:0x6314d3353bae64cf!2m2!1d-86.8392895!2d36.1784541!3e0",
    neighborhood: "North Nashville",
    court_type: "hard",
    lights: false,
    number_of_courts: 2,
    price_per_hour: 5,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Cedar Hill Park",
    park_image: "https://lh3.googleusercontent.com/p/AF1QipPKXIalBy5EoS3hQomwT1BqabdooXi_jeiXYLWC=s680-w680-h510",
    address: "860 Old Hickory Blvd, Madison, TN 37115",
    directions: "https://www.google.com/maps/dir//Cedar+Hill+Park,+Old+Hickory+Boulevard,+Nashville,+TN/@36.271891,-86.8179951,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0x88645cd1ba3581b7:0xee895741acf3351a!2m2!1d-86.7481271!2d36.2717729!3e0",
    neighborhood: "Madison",
    court_type: "grass",
    lights: true,
    number_of_courts: 3,
    price_per_hour: 4,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Richland Park",
    park_image: "https://lh3.googleusercontent.com/p/AF1QipMyGytclEajiwR71wfCd4oJqst1ixndbYkcIeXY=s680-w680-h510",
    address: "4601 Charlotte Pike, Nashville, TN 37209",
    directions: "https://www.google.com/maps/dir//Richland+Park+Tennis+Court,+Park+Avenue,+Nashville,+TN/@36.1516862,-86.9126183,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0x8864616a19110605:0xfaa2b710568ae0bc!2m2!1d-86.8427516!2d36.1515925!3e0",
    neighborhood: "Sylvan Park",
    court_type: "clay",
    lights: true,
    number_of_courts: 4,
    price_per_hour: 4,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Charlotte Park",
    park_image: "https://lh3.googleusercontent.com/p/AF1QipNzuNvBLjJpGS1s5DISJRLod8-XaKPWnflwetI=s680-w680-h510",
    address: "6031 Deal Ave, Nashville, TN 37209",
    directions: "https://www.google.com/maps/dir//Charlotte+Park,+Deal+Avenue,+Nashville,+TN/@36.1546382,-86.9402451,12z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0x886461db7f09198f:0xa28b507bb8dfb3b3!2m2!1d-86.8703771!2d36.1545199!3e0",
    neighborhood: "Charlotte Park",
    court_type: "grass",
    lights: true,
    number_of_courts: 3,
    price_per_hour: 7,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Elmington Park",
    park_image: "https://lh3.googleusercontent.com/p/AF1QipP_To5W0kECdJA7ch6oUNCpyB2ir_0c_wS19jH4=s680-w680-h510",
    address: "3531 West End Ave, Nashville, TN 37205",
    directions: "https://www.google.com/maps/dir//Elmington+Park,+West+End+Avenue,+Nashville,+TN/@36.1336863,-86.893889,12z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0x886463ffd0847247:0xe1732163e6c04ea5!2m2!1d-86.824021!2d36.1335679!3e0",
    neighborhood: "West End",
    court_type: "grass",
    lights: false,
    number_of_courts: 2,
    price_per_hour: 7,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Fannie Mae Dees Park",
    park_image: "https://lh3.googleusercontent.com/p/AF1QipNTVcWNdfbu06fuFsx1k1eMko93UL5va-rLUs31=s680-w680-h510",
    address: "2400 Blakemore Ave, Nashville, TN 37212",
    directions: "https://www.google.com/maps/dir//Fannie+Mae+Dees+Park,+Blakemore+Avenue,+Nashville,+TN/@36.1369844,-86.8761485,12z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0x886466a12e80b2c9:0xc5f704c325dd0003!2m2!1d-86.8062805!2d36.136866!3e0",
    neighborhood: "West End",
    court_type: "grass",
    lights: false,
    number_of_courts: 3,
    price_per_hour: 7,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Hadley Park",
    park_image: "https://filetransfer.nashville.gov/portals/0/sitecontent/Parks/images/community/hadley-tennis.jpg",
    address: "1037 28th Ave N, Nashville, TN 37208",
    directions: "https://www.google.com/maps/dir//Hadley+Park+Community+Center,+28th+Avenue+North,+Nashville,+TN/@36.1655402,-86.8906469,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0x886466cd613f134b:0xc3990c50cfe15016!2m2!1d-86.8232117!2d36.1658783!3e0",
    neighborhood: "North Nashville",
    court_type: "hard",
    lights: true,
    number_of_courts: 4,
    price_per_hour: 7,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Centennial Sportsplex",
    park_image: "https://i2.wp.com/www.tennisitinerary.com/wp-content/uploads/2016/10/IMG_1395.jpg?fit=3264%2C2448&ssl=1",
    address: "222 25th Ave N, Nashville, TN 37203",
    directions: "https://www.google.com/maps/dir//Centennial+Sportsplex+Fitness+%26+Tennis+Center,+25th+Avenue+North,+Nashville,+TN/@36.1510435,-86.8790136,12z/data=!3m2!4b1!5s0x886466b962b6f457:0x5a0109d33cb4b060!4m9!4m8!1m0!1m5!1m1!1s0x886466b9ec5ff2b7:0xc27c3e2d3a192993!2m2!1d-86.8091456!2d36.1509252!3e0",
    neighborhood: "West End",
    court_type: "hard",
    lights: true,
    number_of_courts: 4,
    price_per_hour: 10,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Two Rivers Park",
    park_image: "https://lh3.googleusercontent.com/p/AF1QipPVTXi_6uTI3XCZRPELxp_I3Zvbr9vy9BbgHwNU=s680-w680-h510",
    address: "3150 McGavock Pk, Nashville, TN 37214",
    directions: "https://www.google.com/maps/dir//Two+Rivers+Park,+McGavock+Pike,+Nashville,+TN/@36.1875987,-86.7536385,12z/data=!3m1!5s0x886466b962b6f457:0x5a0109d33cb4b060!4m9!4m8!1m0!1m5!1m1!1s0x886469bddb86dd61:0x215da8e3c441c162!2m2!1d-86.6837705!2d36.1874805!3e0",
    neighborhood: "East Nashville",
    court_type: "clay",
    lights: true,
    number_of_courts: 4,
    price_per_hour: 8,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Shelby Park",
    park_image: "https://lh3.googleusercontent.com/p/AF1QipPk1RxqTiNPD7gU_zTm03TFrNu8nNFt59GjS__d=s680-w680-h510",
    address: "S 20th St & Shelby Ave, Nashville, TN 37206",
    directions: "https://www.google.com/maps/dir//Shelby+Park+Community+Center,+South+20th+Street,+Nashville,+TN/@36.1709633,-86.804976,12z/data=!3m1!5s0x886466b962b6f457:0x5a0109d33cb4b060!4m9!4m8!1m0!1m5!1m1!1s0x8864688696bfb075:0xc5dd8c5071f751bb!2m2!1d-86.735108!2d36.170845!3e0",
    neighborhood: "East Nashville",
    court_type: "clay",
    lights: true,
    number_of_courts: 4,
    price_per_hour: 9,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Madison Park",
    park_image: "https://filetransfer.nashville.gov/portals/0/sitecontent/Parks/images/permits/MadisonParkPlayground.jpg",
    address: "S 20th St, Nashville, TN 37206",
    directions: "https://www.google.com/maps/dir//Madison+Community+Center,+Madison+Park,+North+Dupont+Avenue,+Nashville,+TN/@36.265756,-86.7705899,12z/data=!3m1!5s0x886466b962b6f457:0x5a0109d33cb4b060!4m9!4m8!1m0!1m5!1m1!1s0x886443aa05c0d1b1:0x49c6359785b1f376!2m2!1d-86.7007146!2d36.2656886!3e0",
    neighborhood: "East Nashville",
    court_type: "clay",
    lights: false,
    number_of_courts: 2,
    price_per_hour: 6,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Woodmont Park",
    park_image: "https://lh3.googleusercontent.com/p/AF1QipOWLUFLr4wahO7tdMvAApD11Kdj48CVerOKmiHk=s680-w680-h510",
    address: "616 17th Ave N, Nashville, TN 37203",
    directions: "https://www.google.com/maps/dir//Woodmont+Park,+Woodmont+Park,+Estes+Road,+Nashville,+TN/@36.1187732,-86.9052587,12z/data=!3m1!5s0x886466b962b6f457:0x5a0109d33cb4b060!4m9!4m8!1m0!1m5!1m1!1s0x886463ee9cde72ab:0x889cf2ac8d640859!2m2!1d-86.8353907!2d36.1186548!3e0",
    neighborhood: "West End",
    court_type: "clay",
    lights: false,
    number_of_courts: 1,
    price_per_hour: 4,
    open_time: 10,
    close_time: 20
)
Park.create(
    name: "Green Hills Park",
    park_image: "https://lh3.googleusercontent.com/p/AF1QipPHlvFA5x5TFc1mgCLyw3hXno0zmNGG1hzTlma1=s680-w680-h510",
    address: "1200 Lone Oak Rd, Nashville, TN 37215",
    directions: "https://www.google.com/maps/dir//Green+Hills+Park,+Lone+Oak+Road,+Nashville,+TN/@36.0944838,-86.8755802,12z/data=!3m2!4b1!5s0x886466b962b6f457:0x5a0109d33cb4b060!4m9!4m8!1m0!1m5!1m1!1s0x886464612ec4d983:0x5cfcf4f30b80909e!2m2!1d-86.8057122!2d36.0943654!3e0",
    neighborhood: "Green Hills",
    court_type: "grass",
    lights: false,
    number_of_courts: 3,
    price_per_hour: 7,
    open_time: 10,
    close_time: 20
)
puts 'done seeding parks 🌳'

puts 'creating courts 🎾'
Court.create(
    park_id: 1,
    court_number: 1
)
Court.create(
    park_id: 1,
    court_number: 2
)
Court.create(
    park_id: 2,
    court_number: 1
)
Court.create(
    park_id: 2,
    court_number: 2
)
Court.create(
    park_id: 3,
    court_number: 1
)
Court.create(
    park_id: 3,
    court_number: 2
)
Court.create(
    park_id: 4,
    court_number: 1
)
Court.create(
    park_id: 4,
    court_number: 2
)
Court.create(
    park_id: 4,
    court_number: 3
)
Court.create(
    park_id: 5,
    court_number: 1
)
Court.create(
    park_id: 5,
    court_number: 2
)
Court.create(
    park_id: 5,
    court_number: 3
)
Court.create(
    park_id: 5,
    court_number: 4
)
Court.create(
    park_id: 6,
    court_number: 1
)
Court.create(
    park_id: 6,
    court_number: 2
)
Court.create(
    park_id: 6,
    court_number: 3
)
Court.create(
    park_id: 7,
    court_number: 1
)
Court.create(
    park_id: 7,
    court_number: 2
)
Court.create(
    park_id: 8,
    court_number: 1
)
Court.create(
    park_id: 8,
    court_number: 2
)
Court.create(
    park_id: 8,
    court_number: 3
)
Court.create(
    park_id: 9,
    court_number: 1
)
Court.create(
    park_id: 9,
    court_number: 2
)
Court.create(
    park_id: 9,
    court_number: 3
)
Court.create(
    park_id: 9,
    court_number: 4
)
Court.create(
    park_id: 10,
    court_number: 1
)
Court.create(
    park_id: 10,
    court_number: 2
)
Court.create(
    park_id: 10,
    court_number: 3
)
Court.create(
    park_id: 10,
    court_number: 4
)
Court.create(
    park_id: 11,
    court_number: 1
)
Court.create(
    park_id: 11,
    court_number: 2
)
Court.create(
    park_id: 11,
    court_number: 3
)
Court.create(
    park_id: 11,
    court_number: 4
)
Court.create(
    park_id: 12,
    court_number: 1
)
Court.create(
    park_id: 12,
    court_number: 2
)
Court.create(
    park_id: 12,
    court_number: 3
)
Court.create(
    park_id: 12,
    court_number: 4
)
Court.create(
    park_id: 13,
    court_number: 1
)
Court.create(
    park_id: 13,
    court_number: 2
)
Court.create(
    park_id: 14,
    court_number: 1
)
Court.create(
    park_id: 15,
    court_number: 1
)
Court.create(
    park_id: 15,
    court_number: 2
)
Court.create(
    park_id: 15,
    court_number: 3
)
puts 'done creating courts 🎾'

puts 'seeding 50 reservations 📆'
50.times do Reservation.create(
    user_id: User.all.sample.id,
    park_id: Park.all.sample.id,
    # court_id: Court.all.sample.id,
    date: Faker::Date.between(from: '2023-03-13', to: '2023-03-17'),
    time: Faker::Number.within(range: 10..19),
    duration: Faker::Number.within(range: 1..3),
)
end
puts 'done seeding reservations 📆'

puts 'creating 300 ratings ⭐️'
300.times do Rating.create(
    user_id: User.all.sample.id,
    park_id: Park.all.sample.id,
    rating: Faker::Number.within(range: 1..5)
)
end
puts 'done creating ratings ⭐️'