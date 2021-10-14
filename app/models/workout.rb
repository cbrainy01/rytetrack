class Workout < ApplicationRecord
    belongs_to :exercise
    belongs_to :session 
    belongs_to :user

    validates :session_id, presence: true
    validates :exercise_id, presence: true
    validates :difficulty, :inclusion => { :in => 0..10 }
    validate :divisible_by_two_point_five
    # validate :cardio

    def divisible_by_two_point_five
        if self.weight && self.weight % 2.5 != 0
            errors.add(:weight, "invalid. Must be divisible by 2.5")
        end
    end

    # def cardio
    #     if self.exercise.workout.is_cardio === true && self.weight.nil? === false && self.bar.nil? === false 
    #         errors.add(:base, "cannot have weight or bar for cardiovascular workouts ")
    #     end
    # end







end
