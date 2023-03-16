class User < ApplicationRecord
    has_secure_password
    has_many :reservations
    has_many :parks, through: :reservations
    has_many :courts, through: :parks
    has_many :ratings, dependent: :destroy

    # VALIDATIONS
    TENNIS_LEVEL = ["1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5"]
    PLAY_PREFERENCE = ["Singles", "Doubles", "Singles and Doubles"]
    COURT_PREFERENCE = ["hard", "clay", "grass", "hard and clay", "hard and grass", "clay and grass", "all surfaces"]

    validates :first_name, presence: { message: "must exist" }
    validates :last_name, presence: { message: "must exist" }
    validates :phone, format: { with: /\A\+?\d{1,3}[-.\s]?\d{1,10}\z/, message: "must be a valid phone number" }, length: {is: 10}
    validates :age, inclusion: { in: 18..100, message: "must be between 18 and 100 years old" }
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid email address" }
    validates :tennis_level, inclusion: {in: TENNIS_LEVEL, message: "must be: #{TENNIS_LEVEL.join(', ')}"}
    validates :play_preference, inclusion: {in: PLAY_PREFERENCE, message: "must be: #{PLAY_PREFERENCE.join(', ')}"}
    validates :court_preference, inclusion: {in: COURT_PREFERENCE, message: "must be: #{COURT_PREFERENCE.join(', ')}"}
    validates :year_started, inclusion: { in: 1950..2023, message: "must be between 1950 and 2023." }
    validates :password, presence: true, length: { minimum: 8 }

end