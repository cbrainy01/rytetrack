class SessionSerializer < ActiveModel::Serializer
  belongs_to :user 
  has_many :workouts 
  attributes :id, :date, :user_id, :workouts 

  def user_id
    self.object.user.id
  end

end
