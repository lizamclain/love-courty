class CreateParks < ActiveRecord::Migration[7.0]
  def change
    create_table :parks do |t|
      t.string :name
      t.string :park_image
      t.string :address
      t.string :directions
      t.string :neighborhood
      t.string :court_type
      t.boolean :lights
      t.integer :number_of_courts
      t.integer :price_per_hour
      t.integer :open_time
      t.integer :close_time

      t.timestamps
    end
  end
end
