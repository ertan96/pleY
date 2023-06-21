json.extract! @business, :id, :name, :address, :latitude, :longitude, :category, :created_at, :updated_at
if @business.photo.attached?
    json.photoUrl url_for(@business.photo)
    # json.photoUrl @business.photo.url
else
    json.photoUrl ""
end