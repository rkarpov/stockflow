# class ConvertUsersBalanceToFloatDatatype < ActiveRecord::Migration[5.2]
#   def change
#     remove_column :users, :balance, :float
#     remove_column :transactions, :stock_price, :float
#     add_column :users, :balance, :decimal, :scale => 2, default: 5000.00
#     add_column :transactions, :stock_price, :decimal, :scale => 2, null: false
#   end
# end
