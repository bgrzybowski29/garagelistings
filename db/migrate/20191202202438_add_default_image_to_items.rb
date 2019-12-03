class AddDefaultImageToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :default_image, :text
  end
end
