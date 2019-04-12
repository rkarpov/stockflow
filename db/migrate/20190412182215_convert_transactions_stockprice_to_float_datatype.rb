class ConvertTransactionsStockpriceToFloatDatatype < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :stock_price, :integer, null: false
    add_column :transactions, :stock_price, :float, null: false
  end
end
