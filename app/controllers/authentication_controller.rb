class AuthenticationController < ApplicationController
  before_action :authorize_request, except: [:login, :update_password]

  # POST /auth/login
  def login
    @user = User.find_by_username(login_params[:username])
    if !@user
      render json: { error: 'unauthorized' }, status: :unauthorized
    else
      if @user.authenticate(login_params[:password]) #authenticate method provided by Bcrypt and 'has_secure_password'
        token = encode(user_id: @user.id, username: @user.username)
        render json: { user: @user, token: token }, status: :ok
      else
        render json: { error: 'unauthorized' }, status: :unauthorized
      end         
    end
  end
  
  # GET /auth/verify
  def verify
    render json: @current_user, status: :ok
  end

  def update_password
    @user=User.find_by_username(reset_params[:username])
 
    if @user.authenticate(reset_params[:current_password])   
      @user.password=(reset_params[:new_password])
      if @user.save
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: {error:"Current password is incorrect"}, status: :unprocessable_entity
    end
end

  private

  def login_params
    params.permit(:username, :password)
  end
  def reset_params
    params.permit(:username, :current_password, :new_password)
  end

end
