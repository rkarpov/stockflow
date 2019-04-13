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
    stocks_hash = self.stocks.uniq.pluck(:id, :ticker_symbol).to_h
  end

  def stock_purchases
    self.transactions.where(:type == "buy")
  end

  def portfolio_value
    portfolio_value = BigDecimal(0)
    self.stock_purchases.each do |purchase|
      portfolio_value += BigDecimal(purchase.stock_price * purchase.num_shares)
    end
    return self.get_amount(portfolio_value)
  end
end
