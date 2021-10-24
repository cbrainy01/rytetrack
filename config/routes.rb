Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }


  resources :users, only: [:create]
  post "/login", to: "authentication#login"
  get "/me", to: "users#show"
  get "/persist_exercises", to: "exercises#persist_exercises"
  get "/persist_sessions", to: "sessions#persist_sessions"
  get "/persist_workouts", to: "workouts#persist_workouts"

  delete "/purge/:id", to: "exercises#purge"
  patch "/remove_pic/:id/:pic_id", to: "exercises#remove_pic"
  
  post "/my_exercises", to: "exercises#my_exercises"
  post "/my_sessions", to: "sessions#my_sessions"
  post "/my_workouts", to: "workouts#my_workouts"
  patch "/remove_vid/:id", to: "exercises#remove_vid"
  post "/add_pic/:id", to: "exercises#add_pic"

  get "/chart_info", to: "workouts#chart_info"

  post "/template_create", to: "sessions#template_create"

  resources :sessions
  resources :workouts
  resources :exercises

  get "/test", to: "users#test"

end
