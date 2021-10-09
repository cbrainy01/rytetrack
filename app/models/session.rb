class Session < ApplicationRecord
    belongs_to :user
    # has_many :workouts, dependent: :destroy

end
