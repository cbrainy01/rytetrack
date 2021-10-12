Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }


  resources :users, only: [:create]
  post "/login", to: "authentication#login"
  get "/me", to: "users#show"
  get "/persist_exercises", to: "exercises#persist_exercises"
  get "/persist_sessions", to: "sessions#persist_sessions"
  resources :exercises
  # delete exercise image: destroy "exercises/:id/delete_image/image_id", to: exercises#delete_image
  delete "/purge/:id", to: "exercises#purge"

  patch "/remove_pic/:id/:pic_id", to: "exercises#remove_pic"
  
  post "/my_exercises", to: "exercises#my_exercises"
  post "/my_sessions", to: "sessions#my_sessions"
  patch "/remove_vid/:id", to: "exercises#remove_vid"

  resources :sessions

  get "/test", to: "users#test"

end
