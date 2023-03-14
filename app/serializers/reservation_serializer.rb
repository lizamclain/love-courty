class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :park_id, :date, :time, :duration
end
