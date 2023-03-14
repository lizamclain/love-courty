class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone
      t.integer :age
      t.string :email
      t.integer :tennis_level
      t.string :play_preference
      t.string :court_preference
      t.integer :year_started
      t.string :password
      t.string :user_image

      t.timestamps
    end
  end
end
