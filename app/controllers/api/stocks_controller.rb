class Api::StocksController < ApplicationController

  # retreive current user's stock portfolio
  def retreive_stock_portfolio
    begin
      transactions = current_user.transactions
      @stock_symbols = current_user.get_stock_symbols # returns hash { :id => ticker_symbol }
      fetch_quotes = RestClient.get("https://api.iextrading.com/1.0/stock/market/batch?symbols=#{@stock_symbols.values.join(",")}&types=quote")
      quotes = JSON.parse(fetch_quotes.body)
      @portfolio = current_user.get_stock_portfolio(transactions, @stock_symbols, quotes)
      # portfolio => { total_portfolio_value => $X.XX, companyname => "...", num_shares_owned => X, net_stock_value => $X.XX, performance => color }
      render :index
    rescue
      render json: [""], status: 404
    end
  end

  def search_stock_price
    begin
      fetch_stock_price = RestClient.get("https://api.iextrading.com/1.0/stock/#{params[:ticker_symbol]}/price")
      fetch_result = JSON.parse(fetch_stock_price.body)
      @price = current_user.get_amount(fetch_result) || fetch_result
      @stock = Stock.find_by(ticker_symbol: params[:ticker_symbol].upcase)
      render :show
    rescue
      render json: ["Stock not found"], status: 404
    end
  end

  def stock_params
    params.require(:stock).permit(:ticker_symbol)
  end
end