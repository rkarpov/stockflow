class Stock < ApplicationRecord
  validates :ticker_symbol, :company_name, presence: true, uniqueness: true

end
