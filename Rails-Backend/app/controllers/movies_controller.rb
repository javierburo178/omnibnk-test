class MoviesController < ApplicationController
  before_action :set_movie, only: %i[show update destroy]
  def index
    render json: Movie.all
  end

  def new
  end

  def show
    render json: @movie
  end

  def create
    movie = current_user.movies.new(movie_params)
    if movie.save
      render json: movie, status: :created
    else
      render json: movie.errors, status: :unprocessable_entity
    end
  end

  def update
    if @movie.update(post_params)
      render json: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @movie.destroy
  end

  private

  def set_movie
    @movie = Movie.find(params[:id])
  end

  def movie_params
    params.require(:movie).permit(:name, :description, :director, :published, :user_id)
  end

end