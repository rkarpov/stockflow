# Stock Overflow

## Overview
A single-page stock trading app built for users to simulate buying and selling stocks. A newly instantiated user holds a default balance of $5,000.00 USD. The user can increase their funds only by means of trading stocks. Stock Overflow is perfect for anyone who wants to practice trading stocks online before moving on to trading in crypto currency apps. Moreover, Stock Overflow was inspired by Robinhood.

## Technologies
Stock Overflow is built using Ruby on Rails as backend, React and Redux as frontend, PostgreSQL database, and MaterialUI with CSS for styling components. IEX API (https://iextrading.com) fetches external real time stock data with the help of Ruby's 'rest-client' gem. Stock Overflow is deployed to Heroku. 

## Setup
To run the app locally Git Clone the repository, bundle install ruby gems, install webpack dependencies, and run both rails server + webpack. The exact cammands are...
  - bundle install
  - npm install
  - rails s
  - npm run webpack

## Core Features

## Stock Portfolio
The user stock portfolio code is kept both modular and dry with the help of Rails Services. Service classes and modules take away the burden of oversaturating rails models, controllers, and views with overly complex convoluted code. Service objects are congruent with object oriented programming, thereby enabling scalability as the app grows in size.

## Buy/Sell Stocks

## Listed Transactions
