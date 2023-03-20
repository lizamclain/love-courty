class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :park_image, :address, :directions, :neighborhood, :court_type, :lights, :number_of_courts, :price_per_hour, :open_time, :close_time, :avg_rating, :available_times, :courts, :ratings

  def courts
    object.courts.map do |court|
      court.court_number
    end
  end

  def lights
    object.lights ? "Yes" : "No"
  end

  def open_time
    time = object.open_time > 12 ? object.open_time - 12 : object.open_time
  end

  def close_time
    time = object.close_time > 12 ? object.close_time - 12 : object.close_time
    time
  end

  def available_times
    (object.open_time..object.close_time).to_a
  end

end
