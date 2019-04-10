export const fetchStocks = () => {
  return $.ajax({
    method: "get",
    url: `https://api.iextrading.com/1.0/ref-data/symbols`
  })
}

export const fetchStock = (tickerSymbol) => {
  return $.ajax({
    method: "get",
    url: `https://api.iextrading.com/1.0/stock/${tickerSymbol}/batch?types=quote,chart&range=1d`
  })
}