class Rating < ApplicationRecord
    belongs_to :user
    belongs_to :park

    validates :user_id, :park_id, presence: true
    # validates :rating, inclusion: {in: 1..5}
    # validates that user can only rate a park once
    validates :park_id, uniqueness: { scope: :user_id, message: "has already been rated." }
end
