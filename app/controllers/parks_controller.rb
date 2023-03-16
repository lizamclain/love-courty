class ParksController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :park_not_found
    skip_before_action :authorized_user, only: [:top_rated, :test]


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

    def test
        park = Park.find(id: 15)
        render json: park
    end

    private
    def park_not_found
        render json: {error: "Park not found."}, status: :not_found
    end
end
