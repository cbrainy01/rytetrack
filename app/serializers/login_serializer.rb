class LoginSerializer < ActiveModel::Serializer
  has_many :exercises
  
  attributes :id, :first_name, :last_name, :username, :email, :exercises, :token 

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
