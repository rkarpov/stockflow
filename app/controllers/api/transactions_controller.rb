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
    errors = {}
    errors["stock_ticker"] = 'Invalid stock symbol' if !@stock
    errors["stock_ticker"] = 'Symbol cannot be blank' if params[:data][:stock_symbol] == ""
    errors["balance"] = 'Not enough funds' if @purchase_amount > current_user.balance
    errors["num_shares"] = 'Amount must be a whole number' if params[:data][:num_shares].to_f % 1 != 0
    errors["num_shares"] = 'Amount cannot be blank' if params[:data][:num_shares].to_f == 0
    # if !@stock
      # render json: 'Please enter a valid stock symbol'
    # elsif @purchase_amount > current_user.balance
      # render json: 'Not enough funds'
    # elsif @transaction.num_shares % 1 != 0
      # render json: 
    if errors.length != 0
      render json: errors, status: 401
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