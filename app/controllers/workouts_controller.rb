class WorkoutsController < ApplicationController

    def create
        workout = Workout.create!(workout_params)
        render json: workout, serializer: WorkoutSerializer
    end



    private

    def workout_params
        params.permit( :session_id, :user_id, :exercise_id, :sets, :reps, :weight, :notes, :rest_time, :difficulty, :avg_speed, :avg_incline, :miles, :bar )
    end

end
