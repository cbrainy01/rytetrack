class AddColumnsToExercises < ActiveRecord::Migration[6.1]
  def change
    add_column :exercises, :youtube_url, :string
    add_column :exercises, :timestamp, :integer
  end
end
