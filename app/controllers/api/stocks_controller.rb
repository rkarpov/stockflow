class Api::UsersController < ApplicationController

  def index
    @stocks = Stock.all
  end

  def show
    @stock = Stock.find_by(params[:id])
  end

end