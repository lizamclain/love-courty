Rails.application.routes.draw do
  resources :ratings
  resources :reservations
  resources :courts, only: [:index, :show]
  resources :parks, only: [:index, :show]
  resources :users

  get '/hello', to: 'application#hello_world'
  get '/top_rated', to: 'parks#top_rated'
end
