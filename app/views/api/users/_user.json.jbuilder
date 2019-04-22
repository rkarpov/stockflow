json.extract! user, :id, :username, :email
json.balance Currency.get_amount(current_user.balance)