class ExercisesController < ApplicationController

    skip_before_action :authorize, :only => [:create, :my_exercises]
    # skip_before_action :authorize, only: :create

    def create
        exercise = Exercise.create!(exercise_params)
        render json: exercise, serializer: ExerciseSerializer
    end

    def my_exercises
        # what does params look like cus we have to get the userid sent from frontend
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
        exercises = Exercise.where(user_id: user.id )
        # byebug
        render json: exercises, each_serializer: ExerciseSerializer
        # render json: {exercises: exercises}, status: 200
        end
    end

    def purge
        exercise = Exercise.find(params[:id])
        exercise.demo_pic.purge
        render json: { exercise: exercise }, status: 200
    end

    def index
        exercises = Exercise.all
        render json: { exercises: exercises }, status: 201
        # render json: receipt_records, include: ['receipt_images'], status: :ok
    end


    def delete_image
        demo_pic = ActiveStorage::Attachment.find(params[:image_id])
        # if that pic belongs to that exercise, purge/delete it. Also make sure the pic belongs to current user
        if exercise === demo_pic.record
            image.purge
            render json: { message: "image has been sucessfully deleted"}, status: 200
        else
            render json: { message: "image wasnt deleted" }, status: 404
        end
    end

    private

    def exercise_params
        # params.require(:exercise).permit(:name, :description, :is_cardio, :demo_pic)
        params.permit( :name, :description, :youtube_url, :section, :user_id, :timestamp, :is_cardio, :demo_pic, demos: [] )
    
    end

end
