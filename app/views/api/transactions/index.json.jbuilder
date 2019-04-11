current_user.transactions.each do |transaction|
  json.set! transaction.id do
    user_id = transaction.user_id
    stock = Stock.find_by(params[:user_id])
    json.partial! "api/transactions/transaction", transaction: transaction
    json.ticker_symbol stock.ticker_symbol
  end
end