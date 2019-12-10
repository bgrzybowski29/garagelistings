class UserMailer < ApplicationMailer
  config.load_defaults 5.1
  default from: "garagelistings1@gmail.com"

  def register_email(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to GarageListings')
  end
  def forgot_password(user)
    @user = user
    @greeting = "Hi"
    @url=Rails.configuration.x.web_app_url
    mail to: user.email, :subject => 'GarageListings Reset password instructions'
  end
end