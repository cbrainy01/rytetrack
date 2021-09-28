class AuthenticationController < ApplicationController

    skip_before_action :authorize, only: :login

    def login
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
         payload = {user_id: user.id}
         secret = Rails.application.secret_key_base
         token = JWT.encode(payload, secret)
# also render the user along with a custom serializer. Then use useEffect to store the users info in state 
         render json: { token: token}, status: :created
        else
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
    end

end
