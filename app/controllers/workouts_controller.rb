class WorkoutsController < ApplicationController

    def create
        workout = Workout.create!(workout_params)
        render json: workout, serializer: WorkoutSerializer
    end

    def update
        workout = Workout.find(params[:id])
        workout.update!(workout_params)
        render json: workout, serializer: WorkoutSerializer
    end

    def destroy
        workout = Workout.find(params[:id])
        session_id = workout.session_id
        # byebug
        workout.destroy 
        render json: { message: "sucessfully deleted", deletedId: workout.id, session_id: session_id }
    end

    def my_workouts
        # byebug
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
        workouts = Workout.where(user_id: user.id )
        render json: workouts, each_serializer: WorkoutSerializer
        else render json: {message: "invalid user"}, status: 401
        end
    end

    def persist_workouts
        token = request.headers["authorization"].split(" ")[1]
        secret = Rails.application.secret_key_base         
        payload = JWT.decode(token, secret).first 
        user = User.find(payload["user_id"])
        workouts = Workout.where(user_id: user.id )
        render json: workouts, each_serializer: WorkoutSerializer
    end

    private

    def workout_params
        params.permit( :session_id, :user_id, :exercise_id, :sets, :reps, :weight, :notes, :rest_time, :difficulty, :avg_speed, :avg_incline, :miles, :bar )
    end

end
