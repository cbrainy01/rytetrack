class AddBirackToWorkouts < ActiveRecord::Migration[6.1]
  def change
    add_column :workouts, :birack, :boolean
  end
end
