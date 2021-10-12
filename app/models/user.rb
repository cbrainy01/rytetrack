class User < ApplicationRecord
    has_secure_password
    has_many :exercises, dependent: :destroy
    has_many :sessions, dependent: :destroy
    validates :username, presence: true
    
    # , uniqueness: true

    # validates :password, presence: true,       # spaces not allow 

    # length: {minimum: 6}# least 6 characters required to end
end
