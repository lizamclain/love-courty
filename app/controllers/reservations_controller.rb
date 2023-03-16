class ReservationsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :reservation_not_found
    skip_before_action :authorized_user, only: [:index, :show]

    def index
        render json: Reservation.all, status: :ok
    end

    def show
        reservation = find_reservation
        render json: reservation, status: :ok
    end

    def create
        reservation = Reservation.create!(reservation_params)
        render json: reservation, status: :created
    end

    def update
        reservation = find_reservation
        reservation.update!(reservation_params)
        render json: reservation, status: :accepted
    end

    def destroy
        reservation = find_reservation
        reservation.destroy
        head :no_content
    end

    private
    def find_reservation
        reservation = Reservation.find(params[:id])
    end

    def reservation_params
        params.permit(:user_id, :park_id, :date, :time, :duration)
    end

    def reservation_not_found
        render json: {error: "Reservation not found."}, status: :not_found
    end

end
