class RemoveUniquenessOnStockCompanyName < ActiveRecord::Migration[5.2]
  def change
    remove_index :stocks, :company_name
    add_index :stocks, :company_name
  end
end
