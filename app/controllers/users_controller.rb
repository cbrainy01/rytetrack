class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    def create
        user = User.create!(user_params)
        render json: { user_id: user.id }, status: :created  
    end

    def show
        # find user by id gotten from decoding the token
        # user = User.find(params[:user_id])
        token = request.headers["authorization"].split(" ")[1]
        secret = Rails.application.secret_key_base 

        payload = JWT.decode(token, secret).first 
        user = User.find(payload["user_id"])
        
        # byebug to make sure right params are being used to get user
        render json: { user: user}, status: 200
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
