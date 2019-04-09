class RemoveFirstnameLastnameAddUsernameToUsersColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :first_name, :string  
    remove_column :users, :last_name, :string  
    add_column :users, :username, :string, null: false
  end
end
