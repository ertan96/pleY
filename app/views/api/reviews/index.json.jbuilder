json.array! @reviews do |review|
    puts review.user_info   # Debugging line

    json.extract! review, :id, :body, :rating, :user_id, :business_id

    json.user @review.user_info

    json.business do
        json.extract! review.business, :id, :name, :address
    end
end