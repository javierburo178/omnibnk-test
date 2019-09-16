class PagesController < ApplicationController
  def home
    render json: {status: "Mi primera API para OMNIBNK"}
  end
end