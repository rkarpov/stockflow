class User < ApplicationRecord
  validates :username, :email, :password_digest, :session_token, :balance, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  attr_reader :password
  after_initialize :ensure_token
  
  has_many :transactions,
    foreign_key: :user_id,
    class_name: 'Transaction'

  has_many :stocks,
    through: :transactions,
    source: :stock

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    return nil
  end

  def self.generate_token
    SecureRandom.urlsafe_base64
  end

  def reset_token!
    self.session_token = User.generate_token
    self.save!
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_token 
    self.session_token ||= User.generate_token
  end


  # transaction & portfolio methods


  def get_amount(amount)
    # helper method to convert Decimal data type to currency
    ActionController::Base.helpers.number_to_currency(amount)
  end

  def get_stock_symbols
    symbols_hash = self.stocks.pluck(:id, :ticker_symbol).to_h
  end

  def get_stocks
    stocks_hash = {}
    self.stocks.pluck(:id, :ticker_symbol, :company_name)
      .each { |id, symbol, name| stocks_hash[id] = { ticker_symbol: symbol, company_name: name }}
    return stocks_hash
  end

  def stock_purchases
    self.transactions.where(:type == "buy")
  end

  def get_stock_portfolio(transactions, stock_symbols, quotes)
    value = BigDecimal(0)
    num_stocks_owned = Hash.new(0)
    companies = {}
    performance = {}
    self.stock_purchases.each do |purchase|
      stock_ticker = stock_symbols[purchase.stock_id]
      quote = quotes[stock_ticker]["quote"]
      company_name = quote["companyName"]
      stock_price = quote["latestPrice"]
      open_price = quote["open"]

      value += stock_price * purchase.num_shares
      num_stocks_owned[stock_ticker] += purchase.num_shares
      companies[stock_ticker] = company_name

      case open_price <=> stock_price
      when 1
        performance[stock_ticker] = "red"
      when -1
        performance[stock_ticker] = "green"
      else
        performance[stock_ticker] = "grey"
      end
    end
    portfolio_value = self.get_amount(value)
    stock_value = {}
    stock_symbols.each do |stock| # [stock_id, ticker_symbol]
      stock_value[stock[1]] = 
      self.get_amount(num_stocks_owned[stock[1]] * quotes[stock_symbols[stock[0]]]["quote"]["latestPrice"])
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
