class SessionsController < ApplicationController

    # skip_before_action :authorize, only: :create


    def create
        session = Session.create!(session_params)
        render json: session, serializer: SessionSerializer
    end

    def persist_sessions
        token = request.headers["authorization"].split(" ")[1]
        secret = Rails.application.secret_key_base
        payload = JWT.decode(token, secret).first
        user = User.find(payload["user_id"])
        sessions = Session.where(user_id: user.id)
        # render json: sessions, each_serializer: SessionSerializer
    end

    private

    def session_params
        params.permit(:date, :user_id)
    end

    
end
