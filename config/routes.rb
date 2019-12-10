Rails.application.routes.draw do
  get 'password_resets/new'
  resources :item_images
  resources :items
  # resources :useritems
  post '/auth/login', to: 'authentication#login'
  post '/auth/resetpassword', to: 'authentication#update_password'
  get '/auth/verify', to: 'authentication#verify'
  resources :users
  put 'password_resets/new', to: 'password_resets#new'
  resources :password_resets
  # List of actors by movie
  get 'items/:id/images', to: 'items#show_images'
  get 'users/:id/items', to: 'users#show_items'
  get 'users/:id/savedItems', to: 'users#show_saved_Items'
  post 'users/savedItems/:itemId', to: 'users#add_saved_Item'
  delete 'users/savedItems/:itemId', to: 'users#delete_saved_Item'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
