class User < ApplicationRecord
    has_secure_password


    # validates :password, presence: true,       # spaces not allow 

    # length: {minimum: 6}# least 6 characters required to end
end
