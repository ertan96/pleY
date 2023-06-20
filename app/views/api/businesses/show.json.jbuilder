json.businesses do
    json.extract! @user, :id, :name, :address, :latitude, :longitude, :category, :created_at, :updated_at
end