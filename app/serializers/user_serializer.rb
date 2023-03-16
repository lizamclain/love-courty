class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone, :age, :email, :tennis_level, :play_preference, :court_preference, :year_started, :password_digest, :user_image, :bio, :my_reservations

  def my_reservations
    object.reservations.map do |res|
      {
        park: res.park.name,
        date: res.date,
        time: res.time > 12 ? res.time - 12 : res.time,
        duration: res.duration,
        cost: res.park.price_per_hour * res.duration,
        directions: res.park.directions
      }
    end
  end
end