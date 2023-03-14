class RatingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :park_id, :rating
end
