class ConvertUserBalanceAndTransactionStockpriceToDecimalDatatype < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :balance, :float
    remove_column :transactions, :stock_price, :float
    add_column :users, :balance, :decimal, :precision => 12,:scale => 2, default: 5000.00
    add_column :transactions, :stock_price, :decimal, :precision => 12, :scale => 2, null: false
  end
end
