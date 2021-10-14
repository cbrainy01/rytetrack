class Workout < ApplicationRecord
    belongs_to :exercise
    belongs_to :session 
    belongs_to :user

    validates :session_id, presence: true
    validates :exercise_id, presence: true
    validate :divisible_by_two_point_five


    def divisible_by_two_point_five
        if self.weight % 2.5 != 0
            errors.add(:weight, "invalid. Must be divisible by 2.5")
        end
    end

end
