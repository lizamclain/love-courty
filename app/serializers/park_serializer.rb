class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :park_image, :address, :directions, :neighborhood, :court_type, :lights, :number_of_courts, :price_per_hour, :open_time, :close_time, :avg_rating
end
