json.transaction do
  json.set! @transaction.id do
    json.partial! "api/transactions/transaction", transaction: @transaction
    json.ticker_symbol @stock.ticker_symbol
  end
end

json.user_id current_user.id
json.net_asset_value @net_asset_value
json.balance current_user.get_amount(current_user.balance)