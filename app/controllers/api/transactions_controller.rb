require 'rest-client'

class Api::TransactionsController < ApplicationController
  before_action :require_login

  # show only all of current user's transactions
  def index
    @transactions = current_user.transactions
    @stocks = current_user.get_stocks # { :id => { :ticker_symbol => symbol, :company_name => name }, etc..}
    render :index
  end

  def create
    @transaction = Transaction.new(transaction_params)
    
    purchase_amount = params[:data][:stock_price].to_f * params[:data][:num_shares].to_i
    purchase_amount = ActiveSupport::NumberHelper.number_to_rounded(purchase_amount, precision: 2).to_f
    net_asset_value = params[:data][:net_asset_value].to_f + purchase_amount
    net_stock_value = params[:data][:net_stock_value].to_f + purchase_amount
    @net_asset_value = current_user.get_amount(net_asset_value)
    @net_stock_value = current_user.get_amount(net_stock_value)
    @net_stock_shares = params[:data][:num_shares].to_i + params[:data][:net_stock_shares].to_i

    errors = {}
    errors["tickerSymbol"] = 'Invalid stock symbol' if !@stock
    errors["tickerSymbol"] = 'Symbol cannot be blank' if params[:data][:stock_symbol] == ""
    errors["balance"] = 'Not enough funds' if purchase_amount > current_user.balance
    errors["numShares"] = 'Amount must be a whole number' if params[:data][:num_shares].to_f % 1 != 0
    errors["numShares"] = 'Amount cannot be blank' if params[:data][:num_shares].to_f == 0
 
    if errors.length != 0
      render json: errors, status: 401
    elsif @transaction.save
      current_user.balance -= purchase_amount
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