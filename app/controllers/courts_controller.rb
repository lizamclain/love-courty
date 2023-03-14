class CourtsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :court_not_found

    def index
        render json: Court.all, status: :ok
    end

    def show
        court = Court.find(params[:id])
        render json: court, status: :ok
    end

    private
    def court_not_found
        render json: {error: "Court not found."}, status: :not_found
    end
end
