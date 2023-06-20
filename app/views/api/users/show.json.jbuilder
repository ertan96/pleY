json.user do
  json.extract! @user, :id, :email, :first_name, :last_name_initial, :created_at, :updated_at
end