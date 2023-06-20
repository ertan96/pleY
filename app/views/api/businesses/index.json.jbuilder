json.businesses @businesses do |business|
    json.extract! business, :id, :name, :address, :latitude, :longitude, :category, :created_at, :updated_at
end