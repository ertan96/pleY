class Api::ReviewsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        @reviews = Review.all
        render json: @reviews, methods: [:user_info, :business_name]
    end

    def show
        @review = Review.find(params[:id])
        render json: @review, methods: [:user_info, :business_name]
    end

    def create
        @review = Review.new(review_params)
        if @review.save
            render json: @review
        else
            puts "Review failed to save with errors: #{@review.errors.full_messages}"
            render json: @review.errors, status: 422
        end
    end

    def update
        @review = Review.find(params[:id])
        if @review.update(review_params)
            render json: @review
        else
            render json: @review.errors, status: 422
        end
    end

    def destroy
        @review = Review.find(params[:id])
        business_id = @review.business_id
        @review.destroy

        @business = Business.find(business_id)
        render json: @business
    end

    private

    def review_params
        params.require(:review).permit(:body, :rating, :user_id, :business_id)
    end

    
end
