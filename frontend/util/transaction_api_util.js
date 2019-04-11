export const fetchTransactions = () => {
  return $.ajax({
    method: `GET`,
    url: `/api/transactions`
  })
}

// (stockSymbol, price, numShares, buy/sell)
export const createTransaction = (data) => {
  debugger
  return $.ajax({
    method: `POST`,
    url: `/api/transactions`,
    data: { data } 
  })
}