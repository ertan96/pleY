json.extract! @review, :id, :body, :rating, :user_id, :business_id

json.user do
    json.extract! @review.user, :id, :email, :first_name, :last_name_initial
end

json.business do
    json.extract! @review.business, :id, :name, :address
end