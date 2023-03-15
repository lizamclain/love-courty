class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    include ActionController::Cookies

    #before_action
    before_action :authorized_user

    def current_user
        user = User.find_by(id: session[:user_id])
        user
    end

    def authorized_user
        render json: {errors: "Not Authorized"}, status: :unauthorized unless current_user
    end

    private
    def record_invalid error
        render json: {errors: error.message}, status: 422
    end
end
