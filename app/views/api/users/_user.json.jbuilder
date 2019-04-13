json.extract! user, :id, :username, :email
json.balance current_user.get_amount(current_user.balance)