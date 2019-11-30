class AuthenticationController < ApplicationController
  before_action :authorize_request, except: :login

  # POST /auth/login
  def login
    @user = User.find_by_username(login_params[:username])
    if !@user
      puts 'ben not found unauthorized'
      render json: { error: 'unauthorized' }, status: :unauthorized
    else
      if @user.authenticate(login_params[:password]) #authenticate method provided by Bcrypt and 'has_secure_password'
        puts 'ben got to authenticate'
        token = encode(user_id: @user.id, username: @user.username)
        render json: { user: @user, token: token }, status: :ok
      else
        puts 'ben not found'
        render json: { error: 'unauthorized' }, status: :unauthorized
      end         
    end
  end
  
  # GET /auth/verify
  def verify
    render json: @current_user, status: :ok
  end


  private

  def login_params
    params.permit(:username, :password)
  end
end
