class Rating < ApplicationRecord
    belongs_to :user
    belongs_to :park


    validates :user_id, :park_id, presence: true
    # validates :rating, inclusion: {in: 1..5}
    # validates scope that user can only rate a park once
end
