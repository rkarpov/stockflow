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
    # helper method to convert decimal data type to currency
    ActionController::Base.helpers.number_to_currency(amount)
  end

  def get_stocks
    stocks_hash = self.stocks.pluck(:id, :ticker_symbol).to_h
  end

  def stock_purchases
    self.transactions.where(:type == "buy")
  end

  # continue calculating share holdings
  # def get_share_holdings(transactions, stock_symbols)
  #   # result = {}
  #   holdings = Hash.new(0)
  #   transactions.each do |t|
  #     # key = stock_symbols[t.stock_id]
  #     # holdings[key] => { price += t.num_shares }
  #     holdings[stock_symbols[t.stock_id]] += t.num_shares
  #     # result["num_shares"] = holdings
  #   end
  #   return holdings
  # end

  def get_stock_portfolio(transactions, stock_symbols, prices_companies)
    value = BigDecimal(0)
    num_stocks_owned = Hash.new(0)
    companies = {}
    self.stock_purchases.each do |purchase|
      stock_ticker = stock_symbols[purchase.stock_id]
      stock_price = prices_companies[stock_ticker]["price"]
      company_name = prices_companies[stock_ticker]["company"]["companyName"]
      
      value += stock_price * purchase.num_shares
      num_stocks_owned[stock_ticker] += purchase.num_shares
      companies[stock_ticker] = company_name
    end

    stock_value = {}
    stock_symbols.each do |stock| # { stock_id => ticker_symbol }
      stock_value[stock[1]] = self.get_amount(num_stocks_owned[stock[1]] * prices_companies[stock_symbols[stock[0]]]["price"])
    end
    portfolio_value = self.get_amount(value)
    return { "num_shares" => num_stocks_owned, "net_stock_worth" => stock_value, "net_portfolio_worth" => portfolio_value, "company_name" => companies }
  end
end
