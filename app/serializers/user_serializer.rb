class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone, :age, :email, :tennis_level, :play_preference, :court_preference, :year_started, :password_digest, :user_image, :bio, :my_reservations, :reservations_today, :past_reservations, :upcoming_reservations

  def my_reservations
    object.reservations.map do |res|
      {
        park: res.park.name,
        date: Date.parse(res.date).strftime("%a, %B %d, %Y"),
        time: res.time > 12 ? res.time - 12 : res.time,
        duration: res.duration,
        cost: res.park.price_per_hour * res.duration,
        directions: res.park.directions
      }
    end
  end

  def reservations_today
    object.reservations.filter do |res|
      res.date == Date.today.to_s
    end.map do |res_today|
      {
        park: res_today.park.name,
        date: Date.parse(res_today.date).strftime("%a, %B %d, %Y"),
        time: res_today.time > 12 ? res_today.time - 12 : res_today.time,
        duration: res_today.duration,
        cost: res_today.park.price_per_hour * res_today.duration,
        directions: res_today.park.directions
      }
    end
  end

  def past_reservations
    object.reservations.filter do |res|
      Date.parse(res.date) < Date.today
    end.map do |res_past|
      {
        park: res_past.park.name,
        date: Date.parse(res_past.date).strftime("%a, %B %d, %Y"),
        time: res_past.time > 12 ? res_past.time - 12 : res_past.time,
        duration: res_past.duration,
        cost: res_past.park.price_per_hour * res_past.duration,
        directions: res_past.park.directions
      }
    end
  end

  def upcoming_reservations
    object.reservations.filter do |res|
      Date.parse(res.date) > Date.today
    end.sort_by do |res|
      [res.date, res.time]
    end.map do |res_past|
      {
        park: res_past.park.name,
        date: Date.parse(res_past.date).strftime("%a, %B %d, %Y"),
        time: res_past.time > 12 ? res_past.time - 12 : res_past.time,
        duration: res_past.duration,
        cost: res_past.park.price_per_hour * res_past.duration,
        directions: res_past.park.directions
      }
    end
  end
end