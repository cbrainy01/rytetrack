class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :session_id, :exercise_id, :sets, :exercise_name

  def exercise_name
    self.object.exercise.name
    # alternative
    # name = Exercise.find(self.object.exercise.id)
    # name 
  end


end
