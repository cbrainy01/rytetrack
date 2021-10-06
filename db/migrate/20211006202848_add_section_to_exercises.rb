class AddSectionToExercises < ActiveRecord::Migration[6.1]
  def change
    add_column :exercises, :section, :string
  end
end
