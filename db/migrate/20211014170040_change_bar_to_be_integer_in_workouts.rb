class ChangeBarToBeIntegerInWorkouts < ActiveRecord::Migration[6.1]
  def change
    change_column :workouts, :bar, :integer, using: 'bar::integer'
  end
end
