class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false
      t.integer :stock_id, null: false
      t.integer :stock_price, null: false
      t.integer :num_shares, null: false
      t.string :type, null: false
      t.timestamps
    end
    add_index :transactions, :user_id, unique: true
    add_index :transactions, :stock_id, unique: true
  end
end
