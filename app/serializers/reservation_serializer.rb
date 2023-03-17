class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :park_id, :date, :time, :duration

  def time
    object.time > 12 ? object.time - 12 : object.time
  end

  def date
    new_date = Date.parse(object.date)
    formatted_date = new_date.strftime("%a, %B %d, %Y")
    formatted_date
  end

end
