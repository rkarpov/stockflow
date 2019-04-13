@transactions.each do |transaction|
  json.set! transaction.id do
    json.partial! "api/transactions/transaction", transaction: transaction
    json.ticker_symbol @stocks[transaction.stock_id]

    # logic for portfolio current stock pricing
    # json.ticker_symbol current_user.stocks.pluck
    # json.current_price @stock_prices[@stocks_hash[transaction.stock_id]]["price"]
  end
end