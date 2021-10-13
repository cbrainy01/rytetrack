class SessionsController < ApplicationController

    skip_before_action :authorize, :only => [:my_sessions]


    def create
        session = Session.create!(session_params)
        render json: session, serializer: SessionSerializer
    end

    def destroy
        session = Session.find(params[:id])
        session.destroy
        render json: { message: "sucessfully deleted", deletedId: session.id }
    end

    def update
        
        session = Session.find(params[:id])
        session.update!(session_params)
        render json: { message: "sucessfully updated", updateId: session.id, newDate: session.date }
    end

    def my_sessions
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            sessions = Session.where(user_id: user.id)
            render json: sessions, each_serializer: SessionSerializer
        end
    end

    def persist_sessions
        token = request.headers["authorization"].split(" ")[1]
        secret = Rails.application.secret_key_base
        payload = JWT.decode(token, secret).first
        user = User.find(payload["user_id"])
        sessions = Session.where(user_id: user.id)
        render json: sessions, each_serializer: SessionSerializer
    end

    private

    def session_params
        params.permit(:date, :user_id)
    end

    
end
