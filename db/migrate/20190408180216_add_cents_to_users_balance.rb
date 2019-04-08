class AddCentsToUsersBalance < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :balance, :integer  
    add_column :users, :balance, :integer, default: 5000.00
  end
end
