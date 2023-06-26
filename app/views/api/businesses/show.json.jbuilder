json.extract! @business, :id, :name, :address, :lat, :lng, :category, :created_at, :updated_at
# if @business.photo.attached?
#     json.photoUrl url_for(@business.photo)
#     # json.photoUrl @business.photo.url
# else
#     json.photoUrl ""
if @business.photos.attached?
    json.photosUrls @business.photos.map { |photo| url_for(photo) } 
else
    json.photosUrls []
end