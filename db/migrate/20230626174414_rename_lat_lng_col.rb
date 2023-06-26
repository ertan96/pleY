class RenameLatLngCol < ActiveRecord::Migration[7.0]
  def change
    rename_column :businesses, :latitude, :lat
    rename_column :businesses, :longitude, :lng
  end
end
