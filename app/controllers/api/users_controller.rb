class Api::UsersController < ApplicationController
  def index
    @users = User.All
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else 
      errors = {}
      errors["email"] = "Email Address has already been taken" if User.find_by(email: params[:user][:email])
      errors["password"] = "Password is too short (minimum is 6 characters)" if params[:user][:password].length < 6
      render json: errors, status: 422
      # render json: @user.errors.full_messages, status: 422
    end 
  end 

  def show
    @user = User.find_by(params[:id])
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end 