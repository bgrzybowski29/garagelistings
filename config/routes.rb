Rails.application.routes.draw do
  resources :item_images
  resources :items
  # resources :useritems
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  resources :users

  # List of actors by movie
  get 'items/:id/images', to: 'items#show_images'
  get 'users/:id/items', to: 'users#show_items'
  get 'users/:id/savedItems', to: 'users#show_saved_Items'
  post 'users/savedItems/:itemId', to: 'users#add_saved_Item'
  delete 'users/savedItems/:itemId', to: 'users#delete_saved_Item'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
