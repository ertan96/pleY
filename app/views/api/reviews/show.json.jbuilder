
json.review do
    json.extract! @review, :id, :body, :rating, :user_id, :business_id
    json.user @review.user_info
end

json.business do
    json.extract! @review.business, :id, :name, :address
end