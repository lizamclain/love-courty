class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :phone, :age, :email, :tennis_level, :play_preference, :court_preference, :year_started, :password_digest, :user_image, :bio
end
