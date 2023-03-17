class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone, :age, :email, :tennis_level, :play_preference, :court_preference, :year_started, :password_digest, :user_image, :bio, :my_reservations, :reservations_today, :past_reservations, :upcoming_reservations

  def my_reservations
    object.reservations.map do |res|
      {
        id: res.id,
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
    end.sort_by do |res|
      [res.date, res.time]
    end.map do |res_today|
      {
        id: res_today.id,
        park: res_today.park.name,
        date: format_date(res_today.date),
        time: format_time(res_today.time),
        duration: res_today.duration,
        cost: res_today.park.price_per_hour * res_today.duration,
        directions: res_today.park.directions
      }
    end
  end

  def past_reservations
    object.reservations.filter do |res|
      Date.parse(res.date) < Date.today
    end.sort_by do |res|
      [res.date, res.time]
    end.map do |res_past|
      {
        id: res_past.id,
        park: res_past.park.name,
        date: format_date(res_past.date),
        time: format_time(res_past.time),
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
    end.map do |res_future|
      {
        id: res_future.id,
        park: res_future.park.name,
        date: format_date(res_future.date),
        time: format_time(res_future.time),
        duration: res_future.duration,
        cost: res_future.park.price_per_hour * res_future.duration,
        directions: res_future.park.directions
      }
    end
  end

  private

  def format_date(date)
    Date.parse(date).strftime("%a, %B %d, %Y")
  end

  def format_time(time)
    if time == 12
      "#{time}:00 PM"
    elsif time > 12
      "#{time - 12}:00 PM"
    else
      "#{time}:00 AM"
    end  end
end