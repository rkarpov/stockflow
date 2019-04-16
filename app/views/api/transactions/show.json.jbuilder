json.transaction do
  json.set! @transaction.id do
    json.partial! "api/transactions/transaction", transaction: @transaction
    json.tickerSymbol @stock.ticker_symbol
    json.company @stock.company_name
  end
end

json.stock do
  json.set! @stock.id do
    json.partial! "api/stocks/stock", stock: @stock
    json.company @stock.company_name
    json.netStockValue @net_stock_value
    json.numShares @net_stock_shares
    json.performance @performance
  end
end

json.user do
  json.set! current_user.id do
    json.balance current_user.get_amount(current_user.balance)
    json.netAssetValue @net_asset_value
  end
end