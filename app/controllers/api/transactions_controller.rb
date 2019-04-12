class Api::TransactionsController < ApplicationController
  before_action :require_login

 # show only all of current user's transactions
  def index
    user_id = params[:user_id]
    @transactions = current_user.transactions
    render :index
  end

  def create
    @transaction = Transaction.new(transaction_params)
    @purchase_amount = params[:data][:stock_price].to_i * params[:data][:num_shares].to_i

    if !@stock
      render json: 'Please enter a valid stock symbol'
    elsif @purchase_amount > current_user.balance
      render json: 'Not enough funds'
    elsif @transaction.save
      current_user.balance -= @purchase_amount
      current_user.save
      render :show
    else
      render json: @transaction.errors.full_messages, status: 401
    end
  end

  private
  def transaction_params
    strong_params_hash = params.require(:data).permit(:user_id, :stock_price, :num_shares, :transaction_type)
    @stock = Stock.find_by(ticker_symbol: params[:data][:stock_symbol].upcase)
    strong_params_hash["stock_id"] = @stock.id if @stock
    return strong_params_hash
  end
end