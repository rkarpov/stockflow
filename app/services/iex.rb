module IEX
  module API
    def self.base_url
      return "https://cloud.iexapis.com"
    end

    def self.token
      return "token=pk_eb7ec8e475434e668782abf929ddb21e"
    end

    def self.fetch_quotes(stock_symbols)
      fetch_quotes = RestClient.get(self.base_url + "/stable/stock/market/batch?symbols=#{stock_symbols.values.join(',')}&types=quote&" + self.token)
      quotes = JSON.parse(fetch_quotes.body)
    end

    def self.fetch_price(stock_symbol)
      fetch_stock_price = RestClient.get(self.base_url + "/stable/stock/#{stock_symbol}/quote/latestPrice?" + self.token)
      fetch_result = JSON.parse(fetch_stock_price.body)
      price = Currency.get_amount(fetch_result) || fetch_result
    end

    def self.fetch_open_price(stock_symbol)
      # open_price = RestClient.get(self.base_url + "/stock/#{stock_symbol}/quote/open")
      open_price = RestClient.get(self.base_url + "/stable/stock/market/batch?symbols=#{stock_symbol}&types=ohlc&" + self.token)
      open_price.to_f
    end

    def self.fetch_chart_data(stock_symbol)
      fetch_chart = RestClient.get(self.base_url + "/stable/stock/#{stock_symbol}/batch?types=quote,chart&range=1m&last=10&" + self.token)
    end
  end
end