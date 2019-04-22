class Api::StocksController < ApplicationController

  # retreive current user's stock portfolio
  def index
    if current_user.stocks.length > 0
      @stock_symbols = current_user.get_stock_symbols
      @portfolio = Portfolio::Builder.call(@stock_symbols, current_user)
      # portfolio => { total_portfolio_value => $X.XX, companyname => "...", num_shares_owned => X, net_stock_value => $X.XX, performance => -1, 0, 1 }
      render :index
    else
      render json: { "stocks" => {} }
    end
  end

  def search_stock_price
    begin
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