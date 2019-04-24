# Stockflow

<a href="https://stockflow-app.herokuapp.com/#/portfolio"> Stockflow live site</a>

![Stockflow](https://github.com/rkarpov/stockflow/blob/master/app/assets/images/screenshot.png)

## Overview
A single-page stock trading app built for users to simulate buying and selling stocks. A newly instantiated user holds a default balance of $5,000.00 USD. The user can increase their funds only by means of trading stocks. Stockflow is perfect for anyone who wants to practice trading stocks online before moving on to trading in crypto currency apps. Moreover, Stockflow was inspired by Robinhood.

## Technologies
Stockflow is built using Ruby on Rails as backend, React and Redux as frontend, PostgreSQL database, and MaterialUI with CSS for styling components. IEX API (https://iextrading.com) fetches external real time stock data with the help of Ruby's 'rest-client' gem. Stockflow is deployed to Heroku.

Backend code is kept both modular and dry with the help of Rails Services. Service modules take away the burden of oversaturating rails models, controllers, and views with overly complex convoluted code. Service objects are congruent with object oriented programming, thereby enabling scalability as the app grows in size.

## Setup
To run the app locally Git Clone the repository, bundle install ruby gems, install webpack dependencies, and run both rails server + webpack. The exact cammands are...
  - bundle install
  - npm install
  - rails s
  - npm run webpack


## Core Features

### IEX API
External HTTP requests are made utilizing methods inside the IEX::API module. The base url is concatonated to the rest of the url string with interpolated stock symbols required for fetching data. Again, more information can be found at https://iextrading.com

``` js
app/services/iex.rb
module IEX
  module API
    def self.base_url
      return "https://api.iextrading.com"
    end

    def self.fetch_quotes(stock_symbols)
      fetch_quotes = RestClient.get(self.base_url + "/1.0/stock/market/batch?symbols=#{stock_symbols}&types=quote")
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
```

### Transactions
The transactions of buying and selling stock are stored within a joins table. Each transaction joins the user and stock by id, while storing additional information in the table. Some difficulties with capturing transactions involve handling floats and precision. For this reason, the user's balance and transaction's stock price columns are both stored as decimal data types.

Here are some helpful methods used for monetary calculations and floats in general...
``` js
    ActionController::Base.helpers.number_to_currency(amount)

    ActiveSupport::NumberHelper.number_to_rounded(amt, precision: 2).to_f

    BigDecimal
```
Frontend javascript methods use more general methods to handle float numbers and currency strings such as parseFloat(amt), toFixed(2), and replace(/[^0-9.-]+-/g, "").
