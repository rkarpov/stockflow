@transactions.each do |transaction|
  json.set! transaction.id do
    json.partial! "api/transactions/transaction", transaction: transaction
    json.ticker_symbol @stocks[transaction.stock_id]
  end
end