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
      render :show_stock
    rescue
      render json: { "tickerSymbol" => "Stock not found" }, status: 404
    end
  end

  def search_stocks
    search_string = params[:data][:string].delete(".,'")
    search_value = params[:data][:value]
    if search_value == 'company'
      # replace . , ' with empty space for fuzzy sql matching
      @stocks = Stock.find_by_sql("
        SELECT * 
        FROM stocks 
        WHERE REPLACE(REPLACE(REPLACE(UPPER(company_name), ',', ''''), '.', ''), '''', '') like UPPER('%#{search_string}%')
        ORDER BY LENGTH(company_name)
        LIMIT 5
      ")
    else
      @stocks = Stock.find_by_sql("
        SELECT * 
        FROM stocks 
        WHERE UPPER(ticker_symbol) like UPPER('%#{search_string}%')
        ORDER BY LENGTH(ticker_symbol)
        LIMIT 5
      ")
    end
    render :search
  end

  def show_chart
    @chart_data = IEX::API.fetch_chart_data(params[:data][:tickerSymbol], params[:data][:dateRange])
    render :show_chart
  end

  def stock_params
    params.require(:stock).permit(:ticker_symbol)
  end
end