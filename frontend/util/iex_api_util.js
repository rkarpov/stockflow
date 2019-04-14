const baseUrl = `https://api.iextrading.com/1.0`;

export const fetchStockPortfolio = () => {
  return $.ajax({
    method: "GET",
    url: `/api/stocks`
  })
}

export const fetchStockPrice = (tickerSymbol) => {
  return $.ajax({
    method: "GET",
    url: `/api/stocks/${tickerSymbol}`
  })
}

// front end api call to fetch price

// export const fetchStockPrice = (tickerSymbol) => {
//   return $.ajax({
//     method: "GET",
//     url: baseUrl + `/stock/${tickerSymbol}/price`
//   })
// }

// export const fetchAllStockPrices = (tickerSymbols) => {
//   return $.ajax({
//     method: "GET",
//     url: baseUrl + `/stock/market/batch?symbols=${tickerSymbols}&types=price`
//   })
// }

export const fetchStocks = () => {
  return $.ajax({
    method: "GET",
    url: baseUrl + `/ref-data/symbols`
  })
}

export const fetchStockQuote = (tickerSymbol) => {
  return $.ajax({
    method: "GET",
    url: baseUrl + `/stock/${tickerSymbol}/quote`
  })
}

export const fetchStockCompany = (tickerSymbol) => {
  return $.ajax({
    method: "GET",
    url: baseUrl + `/stock/${tickerSymbol}/company`
  })
}