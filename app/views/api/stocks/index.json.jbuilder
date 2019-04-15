json.stocks do
  @stock_symbols.each do |stock| # [id, symbol]
    stock_id = stock[0]
    stock_ticker = stock[1]
  
    json.set! stock_id do
      json.id stock_id
      json.ticker_symbol stock_ticker
      json.netStockValue @portfolio["net_stock_worth"][stock_ticker]
      json.numShares @portfolio["num_shares"][stock_ticker]
      json.company @portfolio["company_name"][stock_ticker]
    end
  end
end

json.user do
  json.set! current_user.id do
    json.netAssetValue @portfolio["net_portfolio_worth"]
  end
end