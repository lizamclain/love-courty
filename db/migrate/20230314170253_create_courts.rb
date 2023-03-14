class CreateCourts < ActiveRecord::Migration[7.0]
  def change
    create_table :courts do |t|
      t.integer :park_id
      t.integer :court_number

      t.timestamps
    end
  end
end
