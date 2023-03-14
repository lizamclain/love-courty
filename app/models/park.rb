class Park < ApplicationRecord
    has_many :reservations
    has_many :courts
    has_many :users, through: :reservations
end
