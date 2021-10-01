class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.text :description
      t.boolean :is_cardio

      t.timestamps
    end
  end
end
