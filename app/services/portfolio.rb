module Portfolio
  module Builder
    def self.call(stock_symbols, current_user) 
      value = BigDecimal(0)
      num_stocks_owned = Hash.new(0)
      companies = {}
      performance = {}
      
      quotes = IEX::API.fetch_quotes(stock_symbols.values.join(','))

      current_user.transactions.each do |transaction|
        stock_ticker = stock_symbols[transaction.stock_id]
        quote = quotes[stock_ticker]["quote"]
        company_name = quote["companyName"]
        stock_price = quote["latestPrice"]

        value += stock_price * transaction.num_shares
        num_stocks_owned[stock_ticker] += transaction.num_shares
        companies[stock_ticker] = company_name
        performance[stock_ticker] = quote["open"] <=> stock_price
      end

      portfolio_value = Currency.get_amount(value)
      
      stock_value = {}
      stock_symbols.each do |stock| # [stock_id, ticker_symbol]
        stock_value[stock[1]] = 
        Currency.get_amount(num_stocks_owned[stock[1]] * quotes[stock_symbols[stock[0]]]["quote"]["latestPrice"])
      end

      return {
        "num_shares" => num_stocks_owned,
        "net_stock_worth" => stock_value,
        "net_portfolio_worth" => portfolio_value,
        "company_name" => companies,
        "performance" => performance
      }
    end
  end
end


    # def self.call(current_user)
    #   debugger
    #   stock_symbols = current_user.get_stock_symbols
    #   quotes = IEX::API.fetch_quotes(stock_symbols.values.join(','))
    #   value = BigDecimal(0)
      
    #   num_stocks_owned = Hash.new(0)
    #   companies = {}
    #   performance = {}
    #   # current_user.transactions.each do |transaction|
    #   #   stock_ticker = stock_symbols[transaction.stock_id]
    #   #   quote = quotes[stock_ticker]["quote"]
        
    #   #   value += quote["latestPrice"] * transaction.num_shares
    #   #   num_stocks_owned[stock_ticker] += transaction.num_shares
    #   #   companies[stock_ticker] = quote["companyName"]
    #   #   performance[stock_ticker] = quote["open"] <=> quote["latestPrice"]
    #   # end
    #   current_user.stock_purchases.each do |purchase|
    #     debugger
    #     debugger
    #     debugger
    #     debugger
    #     debugger
    #   stock_ticker = stock_symbols[purchase.stock_id.to_f]
    #   quote = quotes[stock_ticker]["quote"]
    #   company_name = quote["companyName"]
    #   stock_price = quote["latestPrice"].to_f

    #   value += stock_price * purchase.num_shares.to_f
    #   num_stocks_owned[stock_ticker] += purchase.num_shares.to_f
    #   companies[stock_ticker] = company_name
    #   performance[stock_ticker] = quote["open"].to_f <=> quote["latestPrice"].to_f
    # end

    #   # current_user.stock_sales.each do |sale|
    #   #   value -= quote["latestPrice"] * sale.num_shares
    #   # end
      
    #   stock_value = self.get_stock_value(stock_symbols, quotes, num_stocks_owned)
    #   portfolio_value = get_amount(value)
    #   # portfolio_value = self.get_amount(value)

    #   return {
    #     "num_shares" => num_stocks_owned,
    #     "net_stock_worth" => stock_value,
    #     "net_portfolio_worth" => portfolio_value,
    #     "company_name" => companies,
    #     "performance" => performance
    #   }
    # end

    # def self.get_stock_value(num_stocks_owned, stock_symbols, quotes)
    #   debugger
    #   stock_value = {}
    #   stock_symbols.each do |stock| # [stock_id, ticker_symbol]
    #     debugger
    #     stock_value[stock[1]] = 
    #     get_amount(num_stocks_owned[stock[1]] * quotes[stock_symbols[stock[0]]]["quote"]["latestPrice"])
    #   end
    #   return stock_value
    # end