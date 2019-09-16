class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :name
      t.text :description
      t.string :director
      t.boolean :published
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
