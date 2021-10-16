class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :session_id, :exercise_id, :sets, :exercise_name, :weight, :birack, :reps, :weight, :notes, :rest_time, :difficulty, :avg_speed, :avg_incline, :miles, :bar

  def exercise_name
    self.object.exercise.name
  end

  def is_cardio
    self.object.exercise.is_cardio
  end

  # create custom attribute which uses current weight and returns object of plates.
  # create custom attribute which converts rest_time to a string.


end
