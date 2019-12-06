class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :update, :destroy]
  before_action :authorize_request, only: :create
  include ActionView::Helpers::DateHelper

  # GET /items
  def index
    @items = Item.all
     @items=@items.map do |item|
      item.timedistance =  distance_of_time_in_words(item.created_at, Time.now)
      item
     end

      render json: @items, include: :user
  end

  # GET /items/1
  def show
    @item.timedistance =  distance_of_time_in_words(@item.created_at, Time.now)
    render json: @item, include: [:user, :itemImages, :savedItems]
  end

  # POST /items
  def create
    @item = @current_user.items.new(item_params)
    if @item.save
      render json: @item, status: :created, location: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /items/1
  def update
    if @item.update(item_params)
      render json: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /items/1
  def destroy
    @item.itemImages.destroy
    @item.destroy
  end

  def show_images
    @images=ItemImage.where(item_id: params[:id])
    render json: @images, status: :ok
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def item_params
      params.require(:item).permit(:title, :description,:price, :make, :model, :mptions, :year, :user_id, :default_image)
    end
end
