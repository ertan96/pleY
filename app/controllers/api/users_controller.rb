class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', 'firstName', 'lastNameInitial']

  before_action :require_logged_out

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name_initial, :password)
  end

end
