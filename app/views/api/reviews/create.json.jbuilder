json.extract! @review, :id, :body, :rating, :user_id, :business_id

json.user do
    json.extract! @review.user, :id, :username, :email
end

json.business do
    json.extract! @review.business, :id, :name, :address
end