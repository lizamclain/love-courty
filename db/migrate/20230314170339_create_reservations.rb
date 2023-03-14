class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.integer :user_id
      t.integer :park_id
      t.string :date
      t.integer :time
      t.integer :duration

      t.timestamps
    end
  end
end
