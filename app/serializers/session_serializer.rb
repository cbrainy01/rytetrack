class SessionSerializer < ActiveModel::Serializer
  belongs_to :user 
  attributes :id, :date, :user_id 

  def user_id
    self.object.user.id
  end

end
