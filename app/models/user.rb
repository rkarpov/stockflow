class User < ApplicationRecord
    validates :username, :email, :password_digest, :session_token, :balance, presence: true
    validates :email, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    
    attr_reader :password
    after_initialize :ensure_token
   
    has_many :transactions,
      foreign_key: :user_id,
      class_name: 'Transaction'

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

    def portfolio_value
      portfolio_amount = 0
      transactions = self.transactions
      transactions.each do |t|
        amt = t.num_shares * t.stock_price
        portfolio_amount += amt if t.transaction_type == "buy"
        portfolio_amount -= amt if t.transaction_type == "sell"
      end
      return portfolio_amount
    end
end
