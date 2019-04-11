class Api::TransactionsController < ApplicationController
  before_action :require_login

 # show only all of current user's transactions
  def index
    user_id = params[:user_id]
    @transactions = Transaction.where('user_id == current_user.id')
    render :index
  end

  def create
    # debugger
    # user_id = params[:data][:user_id].to_i

    @stock = Stock.find_by(ticker_symbol: params[:data][:stock_symbol].upcase)
    if !@stock
      render json: 'Please enter a valid stock symbol'
    elsif (params[:data][:stock_price] * params[:data][:num_shares]) > current_user.balance
      render json: 'You do not have enough funds'
    end

    debugger
    @transaction = Transaction.new({ 
      user_id: current_user.id, stock_id: @stock.id,
      stock_price: params[:data][:stock_price],
      num_shares: params[:data][:num_shares],
      type: params[:data][:type],
    })
    debugger
    # @transaction.user_id = current_user.id
    # @transaction.stock_id = @stock.id
    if @transaction.save
      render :show
    else
      render json: @transaction.errors.full_messages, status: 401
    end
  end

  private
  def transaction_params
    params.require(:data).permit(:user_id, :stock_symbol, :stock_price, :num_shares, :type)
  end
end