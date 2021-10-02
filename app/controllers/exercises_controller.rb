class ExercisesController < ApplicationController

    # skip_before_action :authorize, only: :create

    def create
        exercise = Exercise.create!(exercise_params)
        render json: { exercise: exercise }, status: 201
    end

    def index
        exercises = Exercise.all
        render json: { exercises: exercises }, status: 201
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
        params.permit(:name, :description, :demo_pic, :is_cardio)
    
    end

end
