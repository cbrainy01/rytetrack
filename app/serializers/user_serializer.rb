class UserSerializer < ActiveModel::Serializer
  
  has_many :exercises
  
  attributes :id, :first_name, :last_name, :username, :email, :exercises
end
