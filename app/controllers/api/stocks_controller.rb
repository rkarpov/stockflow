class Api::StocksController < ApplicationController
  def index
    @stocks = Stock.all
  end

  def show
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