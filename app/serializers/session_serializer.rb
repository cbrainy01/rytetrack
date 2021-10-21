class SessionSerializer < ActiveModel::Serializer
  belongs_to :user 
  has_many :workouts 
  has_many :exercises, through: :workouts
  attributes :id, :date, :user_id, :workouts
  # , :preview 

  def user_id
    self.object.user.id
  end

  # def preview
  #   # find exercises where
  #   byebug
  #   if self.object.exercises
  #     preview_sentence = ""
  #     self.object.exercises.each do |exercise|
  #       preview_sentence << "#{exercise.name}, "
  #     end
  #     preview_sentence
  #   else
  #     nil
  #   end
    
  # end

end
