class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.integer :exercise_id
      t.integer :session_id
      t.integer :sets
      t.integer :reps
      t.integer :weight
      t.integer :rest_time
      t.integer :difficulty
      t.integer :avg_speed
      t.integer :avg_incline
      t.integer :miles
      t.string :bar
      t.text :notes

      t.timestamps
    end
  end
end
