json.transaction do
  json.set! @transaction.id do
    json.partial! "api/transactions/transaction", transaction: @transaction
    json.ticker_symbol @stock.ticker_symbol
  end
end

json.user_id current_user.id
json.purchase_amount @purchase_amount
json.balance current_user.get_amount(current_user.balance)