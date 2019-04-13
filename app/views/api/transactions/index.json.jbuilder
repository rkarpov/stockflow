@transactions.each do |transaction|
  json.set! transaction.id do
    stock = Stock.find_by(id: transaction.stock_id)
    json.partial! "api/transactions/transaction", transaction: transaction
    json.ticker_symbol stock.ticker_symbol
    json.current_price @stock_prices[stock.ticker_symbol]["price"]
  end
end