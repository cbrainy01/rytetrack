class LoginSerializer < ActiveModel::Serializer
  has_many :exercises
  has_many :workouts, through: :sessions
  attributes :id, :first_name, :last_name, :username, :workouts, :email, :exercises, :token 

  def token
    user = User.find_by(username: self.object.username)
    if user 
      payload = {user_id: user.id}
      secret = Rails.application.secret_key_base
      token = JWT.encode(payload, secret)
      token
    end
  end
end
