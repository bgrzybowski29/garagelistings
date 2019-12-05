class Item < ApplicationRecord
  belongs_to :user
  # belongs_to :savedItems
  has_many :savedItems
  has_many :itemImages, dependent: :destroy
  attr_accessor :timedistance
  def attributes
    super.merge({'timedistance' => timedistance})
  end
end
