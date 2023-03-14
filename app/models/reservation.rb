class Reservation < ApplicationRecord
    belongs_to :park
    belongs_to :user
    # has_many :courts, through: :parks

    validates :user_id, :park_id, :date, presence: true
    validates :time, inclusion: {in: 10..20, message: "must be between 10 and 20"}
    validates :duration, inclusion: {in: 1..3, message: "must be between 1 and 3"}
end
