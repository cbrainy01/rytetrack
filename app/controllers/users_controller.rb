class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    def create
        user = User.create!(user_params)

        payload = {user_id: user.id}
         secret = Rails.application.secret_key_base
         token = JWT.encode(payload, secret)
        render json: user, serializer: LoginSerializer  
        # render json: { message: "user sucessfully signed up", user: user, token: token }, status: :created  
    
    end

    def show # ME ROUTE
        # find user by id gotten from decoding the token
        # user = User.find(params[:user_id])
        token = request.headers["authorization"].split(" ")[1]
        secret = Rails.application.secret_key_base 

        payload = JWT.decode(token, secret).first 
        user = User.find(payload["user_id"])
        
        # byebug to make sure right params are being used to get user
        # serialized_user = ActiveModel::UserSerializer.new(user)
        render json: user, serializer: UserSerializer
        # render json: { token: token, user: serialized_user }
        # render json: { user: user}, status: 200
    end

    # create show route to test before action
    def test
        render json: { result: "Sucessfully got through before action and protected info can be seen. AKA user is authorized"}, status: 200
    end



    private

    def user_params
        params.permit(:username, :first_name, :last_name, :password, :password_confirmation, :email)
    end


end
