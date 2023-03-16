class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :park_id, :date, :time, :duration

  def time
    object.time > 12 ? object.time - 12 : object.time
  end
end
