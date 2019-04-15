@transactions.each do |transaction|
  json.set! transaction.id do
    json.partial! "api/transactions/transaction", transaction: transaction
    json.company @stocks[transaction.stock_id][:company_name]
  end
end