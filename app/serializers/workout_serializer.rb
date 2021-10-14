class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :session_id, :exercise_id, :sets 
end
