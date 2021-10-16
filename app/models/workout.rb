class Workout < ApplicationRecord
    belongs_to :exercise
    belongs_to :session 
    belongs_to :user

    validates :session_id, presence: true
    validates :exercise_id, presence: true
    validates :difficulty, :inclusion => { :in => 0..10, message: " must be within range of 0-10" }, :allow_nil => true
    validates :notes, length: { maximum: 300 }, allow_blank: true #!!!!
    validates :bar, :inclusion => { :in => [0, 15, 35, 45, 50], message: "bell is not included in options" }, :allow_nil => true


    validate :divisible_by_two_point_five
    validate :cardio
    validate :not_cardio

    def divisible_by_two_point_five
        if self.weight && self.weight % 2.5 != 0
            errors.add(:weight, "invalid. Must be divisible by 2.5")
        end
    end

    def cardio
        # byebug
        if self.exercise_id
            if self.exercise.is_cardio && self.weight
                errors.add(:base, "cannot have weight for cardiovascular exercise ")
            end

            if self.exercise.is_cardio && self.bar 
                errors.add(:base, "cannot have barbell for cardiovascular exercise ")
            end

            if self.exercise.is_cardio && self.reps 
                errors.add(:base, "cannot have reps for cardiovascular exercise ")
            end

            if self.exercise.is_cardio && self.sets 
                errors.add(:base, "cannot have sets for cardiovascular exercise ")
            end  
        end
       

    end

    def not_cardio

        if self.exercise_id
            if !self.exercise.is_cardio && self.avg_speed
                errors.add(:base, "cannot have average speed for non-cardiovascular workout")
            end
            if !self.exercise.is_cardio && self.avg_incline
                errors.add(:base, "cannot have average incline for non-cardiovascular workout")
            end
            if !self.exercise.is_cardio && self.miles
                errors.add(:base, "cannot have miles for non-cardiovascular workout")
            end
        end
        
    end



end

