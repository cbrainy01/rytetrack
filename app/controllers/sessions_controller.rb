class SessionsController < ApplicationController

    skip_before_action :authorize, :only => [:my_sessions]


    def create
        session = Session.create!(session_params)
        render json: session, serializer: SessionSerializer
    end

    def template_create
        session = Session.create!(date: params[:date], user_id: params[:user_id])
        session_id = session.id 
        user_id = params[:user_id]
        workouts = params[:workouts]
        workouts.each do |workout|
       
            create_info = workout.except(:id, :exercise_name, :is_cardio, :exercise_section, :session_date, :plate_arrangement, :rest_time_string)
            create_info[:session_id] = session_id
            
            create_info.permit!
            Workout.create!(create_info)
        end

        render json: session, serializer: SessionSerializer
        # check out session to make sure it has the workouts
        #if session has the new workouts, render as json using serializer
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
        else render json: {message: "invalid user"}, status: 401
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
        params.permit(:date, :user_id, :workouts)
    end

    
end
