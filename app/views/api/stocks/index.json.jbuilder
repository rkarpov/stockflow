# @stock_symbols.each do |stock|
#   json.set! stock.id do
#     # json.partial! "api/stocks/stock", stock: stock
#     json.ticker_symbol @stocks[stock.stock_id]

#     # logic for portfolio current stock pricing
#     # json.ticker_symbol current_user.stocks.pluck
#     json.current_price @stock_prices[@stocks_hash[stock.id]]["price"]
#   end
# end
debugger
  @stock_symbols.each do |stock|
    json.set! stock.id do

    end
  end
  
json.portfolio @portfolio["net_portfolio_worth"]