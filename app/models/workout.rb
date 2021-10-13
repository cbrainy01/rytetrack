class Workout < ApplicationRecord
    belongs_to :exercise
    belongs_to :session 
    belongs_to :user

    validates :session_id, presence: true
    validates :exercise_id, presence: true
end
