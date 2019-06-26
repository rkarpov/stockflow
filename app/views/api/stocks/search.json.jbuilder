@stocks.each_with_index do |stock, idx|
  json.set! idx do
    json.id stock.id 
    json.company stock.company_name
    json.ticker stock.ticker_symbol
  end
end