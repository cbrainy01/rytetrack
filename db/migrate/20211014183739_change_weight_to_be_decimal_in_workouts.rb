class ChangeWeightToBeDecimalInWorkouts < ActiveRecord::Migration[6.1]
  def change
    change_column :workouts, :weight, :decimal, using: 'weight::decimal'

  end
end
