class Api::BusinessesController < ApplicationController
  def index
    @businesses = Business.order(:id)
  end

  def show
    @business = Business.find(params[:id])
  end

  def search 
    query = params[:query].downcase
    search_term = "%#{query}%"
    @businesses = Business.where("LOWER(name) LIKE ? OR LOWER(category) LIKE ?", search_term, search_term)
    render :index
  end
end
