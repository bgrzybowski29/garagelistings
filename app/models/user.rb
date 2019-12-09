class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }
  # For only doing this on create if we want to skip password validation
  # validates :password, presence: true, on: :create
  has_many :savedItems
  has_many :items
  has_many :itemsSaved, through: :savedItems, :source => :item
end
