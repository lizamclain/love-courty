class ParksController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :park_not_found

    def index
        render json: Park.all, status: :ok
    end

    def show
        park = Park.find(params[:id])
        render json: park, status: :ok
    end

    private
    def park_not_found
        render json: {error: "Park not found."}, status: :not_found
    end
end
