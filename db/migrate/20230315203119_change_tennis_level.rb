class ChangeTennisLevel < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :tennis_level, :string
  end
end
