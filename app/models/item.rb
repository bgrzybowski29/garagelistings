class Item < ApplicationRecord
  belongs_to :user
  belongs_to :savedItems
  has_many :savedItems
  has_many :itemImages
end
