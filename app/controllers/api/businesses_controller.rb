class Api::BusinessesController < ApplicationController
  def index
    @businesses = Business.order(:id)
  end

  def show
    @business = Business.find(params[:id])
  end
end
