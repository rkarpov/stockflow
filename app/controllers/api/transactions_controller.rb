class Api::TransactionsController < ApplicationController
  before_action :require_login

  # show only all of current user's transactions
  def index
    @transactions = current_user.transactions
    @stocks = current_user.get_stocks # { :id => { :ticker_symbol => symbol, :company_name => name }, etc..}
    render :index
  end

  def create
    @transaction = Transaction.new(transaction_params) # @stock method is available from call to transaction_params
    @transaction_data = TransactionService::Builder.call(@stock, params[:data], current_user.balance)
    # @transaction_data => { net_stock_shares => X, net_asset_value => "$X.XX",
    #                        net_stock_value => "$X.XX", purchase_amt => X.XX,
    #                        errors => { tickerSymbol => "...", balance => "...", numShares => "..." }}
    if @transaction_data["errors"].length != 0
      render json: @transaction_data["errors"], status: 401
    elsif @transaction.save
      @transaction_data["performance"] = TransactionService::Builder.stock_performance(@transaction_data, params[:data])
      current_user.balance -= @transaction_data["purchase_amt"]
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