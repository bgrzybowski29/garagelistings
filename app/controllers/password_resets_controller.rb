class PasswordResetsController < ApplicationController
  def new
    user = User.find_by_email(params[:email])
    user.send_password_reset if user
    render json: {message:'E-mail sent with password reset instructions.'}
  end
  def edit
    @user = User.find_by_password_reset_token!(params[:id])
  end
  def update
    @user = User.find_by_password_reset_token!(params[:id])
    if @user.password_reset_sent_at < 2.hour.ago
      render json: {error:'Password reset has expired'}
    elsif @user.update(user_params)
      render json: { message:'Password has been reset!'}
    else
      render :edit
    end
  end
  
  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:password)
    end
  
end
