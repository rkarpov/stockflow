module Currency
  def self.get_amount(amount)
  # helper method to convert Decimal data type to currency
    ActionController::Base.helpers.number_to_currency(amount)
  end
end