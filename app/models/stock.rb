class Stock < ApplicationRecord
  validates :ticker_symbol, :company_name, presence: true
  validates :ticker_symbol, uniqueness: true

  has_many :transactions,
    foreign_key: :stock_id,
    class_name: 'Transaction'

  has_many :users,
    through: :transactions,
    source: :user
end