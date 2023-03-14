class RatingsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :rating_not_found

    def index
        render json: Rating.all, status: :ok
    end

    def show
        rating = find_rating
        render json: rating, status: :ok
    end

    def create
        rating = Rating.create!(rating_params)
        render json: rating, status: :created
    end

    def update
        rating = find_rating
        rating.update!(rating_params)
        render json: rating, status: :accepted
    end

    def destroy
        rating = find_rating
        rating.destroy
        head :no_content
    end

    private
    def find_rating
        rating = Rating.find(params[:id])
    end

    def rating_params
        params.permit(:user_id, :park_id, :rating)
    end

    def rating_not_found
        render json: {error: "Rating not found."}, status: :not_found
    end
end
