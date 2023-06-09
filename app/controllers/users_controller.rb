class UsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :user_not_found
    # skip_before_action
    skip_before_action :authorized_user, only: [:index, :create] #, :edit_reservation]

    def index
        render json: User.all, status: :ok
    end

    def show
        user = current_user
        # user = find_user
        render json: user, status: :ok
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def update
        user = find_user
        user.update!(user_params)
        render json: user, status: :accepted
    end

    # def edit_reservation
    #     user = current_user
    #     reservation = user.my_reservations.find(params[:id])
    #     park = Park.find(params[:park_id])
    #     reservation.update!(reservation_params.merge(park: park))
    #     render json: user, status: :accepted
    # end

    def destroy
        user = find_user
        user.destroy
        head :no_content
    end

    private
    def find_user
        user = User.find(params[:id])
    end

    def user_params
        params.permit(:first_name, :last_name, :phone, :age, :email, :tennis_level, :play_preference, :court_preference, :year_started, :password, :user_image, :bio)
    end

    def reservation_params
        params.permit(:user_id, :park_id, :date, :time, :duration)
    end

    def user_not_found
        render json: {error: "User not found."}, status: :not_found
    end
end
