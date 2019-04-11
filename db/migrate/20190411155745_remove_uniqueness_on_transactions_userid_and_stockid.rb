class RemoveUniquenessOnTransactionsUseridAndStockid < ActiveRecord::Migration[5.2]
  def change
    remove_index :transactions, :user_id
    remove_index :transactions, :stock_id
  end
end
