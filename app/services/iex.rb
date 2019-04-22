module IEX
  module API
    def self.base_url
      return "https://api.iextrading.com"
    end

    def self.fetch_quotes(stock_symbols)
      fetch_quotes = RestClient.get(self.base_url + "/1.0/stock/market/batch?symbols=#{stock_symbols.values.join(',')}&types=quote")
      quotes = JSON.parse(fetch_quotes.body)
    end

    def self.fetch_price(stock_symbol)
      fetch_stock_price = RestClient.get(self.base_url + "/1.0/stock/#{stock_symbol}/price")
      fetch_result = JSON.parse(fetch_stock_price.body)
      price = Currency.get_amount(fetch_result) || fetch_result
    end

    def self.fetch_open_price(stock_symbol)
      open_price = RestClient.get(self.base_url + "/1.0/stock/#{stock_symbol}/quote/open")
      open_price.to_f
    end
  end
end