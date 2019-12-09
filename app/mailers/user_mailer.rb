class UserMailer < ApplicationMailer
  default from: "garagelistings1@gmail.com.com"

  def register_email(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to GarageListings')
  end

end
