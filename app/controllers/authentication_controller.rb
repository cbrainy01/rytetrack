class AuthenticationController < ApplicationController

    skip_before_action :authorize, only: :login

    def login
        # after authenticating user, create a token for that user

        user = User.find_by(username: params[:username])
        # byebug
        if user && user.authenticate(params[:password])
         payload = {user_id: user.id}
         secret = Rails.application.secret_key_base
         token = JWT.encode(payload, secret)
            # also render the user along with a custom serializer. Then use useEffect to store the users info in state 

         render json: user, serializer: LoginSerializer
        #  render json: user, serializer: UserSerializer 
        #  render json: { token: token, user: user}, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

    def s_user
       return ActiveModel::UserSerializer.new(@user).as_json
    end


end
