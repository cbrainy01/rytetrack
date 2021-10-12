class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid_response
  before_action :authorize

  def authorize
    authorization_header = request.headers["authorization"]    

    if !authorization_header
      render json: { error: "No authorization header" }, status: :unauthorized
    else
      token = authorization_header.split(" ")[1]
      secret = Rails.application.secret_key_base
      # byebug
      begin
          payload = JWT.decode(token, secret).first 
          user = User.find(payload["user_id"])
          # byebug
      rescue
        render json: { error: "Unauthorized, bad token", status: :unauthorized }
      end
    end

    # user = User.find_by(id: session[:user_id])
    # render json: { errors: ["Not authorized"] }, status: :unauthorized unless user
  end

  private

  def record_invalid_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

end
