class ChangePhonetoString < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :phone, :integer
  end
end
