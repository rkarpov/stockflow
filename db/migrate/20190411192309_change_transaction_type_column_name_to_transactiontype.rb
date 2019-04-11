class ChangeTransactionTypeColumnNameToTransactiontype < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :type, :string
    add_column :transactions, :transaction_type, :string, null: false
  end
end
