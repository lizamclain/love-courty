class Park < ApplicationRecord
    has_many :reservations
    has_many :courts
    has_many :users, through: :reservations
    has_many :ratings

    def avg_rating
        my_rating = 0
        self.ratings.map do |rating|
            my_rating = my_rating + rating.rating
        end
        avg_rating = my_rating.to_f / self.ratings.length
        avg_rating.round(1)
    end

end
