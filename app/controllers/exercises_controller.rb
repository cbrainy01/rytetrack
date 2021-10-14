class ExercisesController < ApplicationController

    skip_before_action :authorize, :only => [:create, :my_exercises]
    # skip_before_action :authorize, only: :create

    def create
        exercise = Exercise.create!(exercise_params)
        render json: exercise, serializer: ExerciseSerializer
    end

    def update
        exercise = Exercise.find(params[:id])
        # byebug
        exercise.update!(exercise_params)
        # byebug
        render json: exercise, serializer: ExerciseSerializer
    end

    def my_exercises
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
        exercises = Exercise.where(user_id: user.id )
        # byebug
        render json: exercises, each_serializer: ExerciseSerializer
        else render json: {message: "invalid user"}, status: 401
        # render json: {exercises: exercises}, status: 200
        end
    end

    def destroy
        exercise = Exercise.find(params[:id])
        exercise.destroy
        render json: { message: "sucessfully deleted", deletedId: exercise.id}
    end

    def remove_vid
        exercise = Exercise.find(params[:id])
        
        exercise.update!(:youtube_url => "")
        render json: { message: "video sucessfully removed", updatedId: exercise.id }
    end

    def persist_exercises
        token = request.headers["authorization"].split(" ")[1]
        secret = Rails.application.secret_key_base         
        payload = JWT.decode(token, secret).first 
        user = User.find(payload["user_id"])
        exercises = Exercise.where(user_id: user.id )
        render json: exercises, each_serializer: ExerciseSerializer
        
    end

    def remove_pic
        exercise = Exercise.find(params[:id])
        pic_id = params["pic_id"].to_i
        # iterate through all the demos for that exercise and get the id If the id matches the id from params, 
        # call purge_later on that demo
        if exercise.demos.attached? 
            
            exercise.demos.each do |demo|
                # for each demo, we wanna get its attributes, more specifically, the id.
                # if the id matches params.pic_id, go ahead and purge that demo
                atts = demo.blob.attributes.slice('filename', 'byte_size', 'id')           
                id = atts["id"]
                if id == pic_id
                    demo.purge
                end
            
            end
                render json: { pic_id: pic_id, exercise_id: params[:id].to_i }, status: 200
            else
                render json: {message: "no pics were found"}, status: 200
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
        params.permit( :name, :description, :youtube_url, :section, :user_id, :timestamp, :url, :exercise_id, :is_cardio, :demo_pic, demos: []   )
    
    end

end
