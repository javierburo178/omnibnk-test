class Movie < ApplicationRecord
  belongs_to :user
  validates :name, :description, :director, presence: true
end
