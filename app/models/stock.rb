class Stock < ApplicationRecord
  validates :ticker_symbol, :company_name, presence: true, uniqueness: true

  has_many :transactions,
    foreign_key: :stock_id,
    class_name: 'Transaction'
end
