json.array! @businesses do |business|
    json.extract! business, :id, :name, :address, :latitude, :longitude, :category, :created_at, :updated_at
    if business.photos.attached?
        json.photosUrls business.photos.map { |photo| url_for(photo) } 
    else
        json.photosUrls []
    end
end