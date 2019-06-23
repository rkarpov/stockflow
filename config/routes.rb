Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
      resources :users, only: [:create, :show]      # user sign up
      resource :session, only: [:create, :destroy]  # user login, logout
      resources :stocks, only: [:index]
      get 'stocks/:ticker_symbol', to: 'stocks#search_stock_price'
      get 'stocks/:ticker_symbol/show_chart', to: 'stocks#show_chart'
      resources :transactions, only: [:index, :create]
  end

  root "static_pages#root"
end
