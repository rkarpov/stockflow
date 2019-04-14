json.individual_stocks do
  @stock_symbols.each do |stock| # [id, symbol]
    stock_id = stock[0]
    stock_ticker = stock[1]
  
    json.set! stock_id do
      json.symbol stock_ticker
      json.net_stock_value @portfolio["net_stock_worth"][stock_ticker]
      json.num_shares @portfolio["num_shares"][stock_ticker]
      json.company @portfolio["company_name"][stock_ticker]
    end
  end
end

json.net_asset_value @portfolio["net_portfolio_worth"]