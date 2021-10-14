class ChangeIntegersToBeDecimalsInWorkouts < ActiveRecord::Migration[6.1]
  def change
    change_column :workouts, :avg_speed, :decimal, using: 'avg_speed::decimal'
    change_column :workouts, :avg_incline, :decimal, using: 'avg_incline::decimal'
    change_column :workouts, :miles, :decimal, using: 'miles::decimal'

  end
end
