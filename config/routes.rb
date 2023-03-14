Rails.application.routes.draw do
  resources :ratings
  resources :reservations
  resources :courts
  resources :parks
  resources :users

  get '/hello', to: 'application#hello_world'
end
