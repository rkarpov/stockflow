@transactions.each do |transaction|
  json.set! transaction.id do
    json.partial! "api/transactions/transaction", transaction: transaction
    json.ticker_symbol @stocks[transaction.stock_id][:ticker_symbol]
    json.company @stocks[transaction.stock_id][:company_name]
    json.stock_price current_user.get_amount(transaction.stock_price)
  end
end