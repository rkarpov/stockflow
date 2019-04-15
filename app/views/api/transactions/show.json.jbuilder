json.transaction do
  json.set! @transaction.id do
    json.partial! "api/transactions/transaction", transaction: @transaction
    json.ticker_symbol @stock.ticker_symbol
  end
end

json.stock do
  json.set! @stock.id do
    json.partial! "api/stocks/stock", stock: @stock
    json.netStockValue @netStockValue
    json.netStockShares @netStockShares
  end
end

json.user_id current_user.id
json.balance current_user.get_amount(current_user.balance)
json.net_asset_value @net_asset_value
json.shares_purchased @shares_purchased