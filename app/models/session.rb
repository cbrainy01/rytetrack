class Session < ApplicationRecord
    belongs_to :user
    validates :date, presence: true;
    has_many :workouts, dependent: :destroy
    has_many :exercises, through: :workouts

end
