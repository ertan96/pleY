# == Schema Information
#
# Table name: businesses
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  address    :string           not null
#  latitude   :float            not null
#  longitude  :float            not null
#  category   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Business < ApplicationRecord
    validates :name, :address, :latitude, :longitude, :category, presence: true

end
