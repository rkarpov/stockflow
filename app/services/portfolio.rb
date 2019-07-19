module Portfolio
  module Builder
    def self.call(stock_symbols, current_user) 
      value = BigDecimal(0)
      num_stocks_owned = Hash.new(0)
      companies = {}
      performance = {}
      
      quotes = IEX::API.fetch_quotes(stock_symbols)

      current_user.transactions.each do |transaction|
        stock_ticker = stock_symbols[transaction.stock_id]
        quote = quotes[stock_ticker]["quote"]
        company_name = quote["companyName"]
        stock_price = quote["latestPrice"]

        value += stock_price * transaction.num_shares
        num_stocks_owned[stock_ticker] += transaction.num_shares
        companies[stock_ticker] = company_name
        performance[stock_ticker] = quote["change"] <=> 0
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