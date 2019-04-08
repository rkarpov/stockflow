class User < ApplicationRecord
    validates :first_name, :last_name, :email, :password_digest, :session_token, :balance, presence: true
    validates :email, uniquesness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    
    attr_reader :password
    after_initialize :ensure_token
   
    
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
end
