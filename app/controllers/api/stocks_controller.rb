class Api::StocksController < ApplicationController

  # def index
  #   @stock_symbols = current_user.get_stock_symbols # returns hash { :id => ticker_symbol }
  #   if @stock_symbols.length > 0
  #     fetch_quotes = RestClient.get("https://api.iextrading.com/1.0/stock/market/batch?symbols=#{@stock_symbols.values.join(",")}&types=quote")
  #     quotes = JSON.parse(fetch_quotes.body)
  #     transactions = current_user.transactions
  #     @portfolio = current_user.get_stock_portfolio(transactions, @stock_symbols, quotes)
  #     # portfolio => { total_portfolio_value => $X.XX, companyname => "...", num_shares_owned => X, net_stock_value => $X.XX, performance => color }
  #     render :index
  #   else
  #     render json: { "stocks" => {} }
  #   end
  # end
  
  # retreive current user's stock portfolio
  def index
    if current_user.stocks.length > 0
      @stock_symbols = current_user.get_stock_symbols
      @portfolio = Portfolio::Builder.call(@stock_symbols, current_user)
      # portfolio => { total_portfolio_value => $X.XX, companyname => "...", num_shares_owned => X, net_stock_value => $X.XX, performance => color }
      render :index
    else
      render json: { "stocks" => {} }
    end
  end

  def search_stock_price
    begin
      # fetch_stock_price = RestClient.get("https://api.iextrading.com/1.0/stock/#{params[:ticker_symbol]}/price")
      # fetch_result = JSON.parse(fetch_stock_price.body)
      # @price = Currency.get_amount(fetch_result) || fetch_result
      @price = IEX::API.fetch_price(params[:ticker_symbol])
      @stock = Stock.find_by(ticker_symbol: params[:ticker_symbol].upcase)
      render :show
    rescue
      render json: { "tickerSymbol" => "Stock not found" }, status: 404
    end
  end

  def stock_params
    params.require(:stock).permit(:ticker_symbol)
  end
end