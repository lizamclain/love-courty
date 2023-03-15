class ParksController < ApplicationController
    # rescue_from ActiveRecord::RecordNotFound, with: :park_not_found

    def index
        render json: Park.all, status: :ok
    end

    def show
        myPark = Park.find(params[:id])
        render json: myPark, status: :ok
    end

    def top_rated
        top_rated = Park.first
        # top_rated = Park.all.sort_by(&:avg_rating)
        render json: top_rated
        # render json: top_rated.reverse.first(5), status: :ok
    end

    private
    def park_not_found
        render json: {error: "Park not found."}, status: :not_found
    end
end
