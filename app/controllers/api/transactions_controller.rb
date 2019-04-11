class Api::TransactionsController < ApplicationController
  before_action :require_login

 # show only all of current user's transactions
  def index
    @transactions = Transaction.where('user_id == current_user.id')
    render :index
  end

  def create
    debugger
    @stock = Stock.find_by(params(:symbol))
    if !@stock
      render json: @stock.errors.full_messages, status: 401 
    elsif params(:amount) > current_user.balance
      render json: 'You do not have enough funds'
    end

    @transaction = Transaction.new(transaction_params)
    @transaction.user_id = current_user.id
    @transaction.stock_id = @stock.id
    if @transaction.save
      render :show
    else
      render json: @transaction.errors.full_messages, status: 401
    end
  end

  private
  def transaction_params
    params.require(:transaction).permit(:user_id, :stock_id, :amount, :num_shares, :type)
  end
end