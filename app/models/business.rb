# == Schema Information
#
# Table name: businesses
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  address    :string           not null
#  lat        :float            not null
#  lng        :float            not null
#  category   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Business < ApplicationRecord
    validates :name, :address, :lat, :lng, :category, presence: true

    has_many_attached :photos
    has_many :reviews, dependent: :destroy
end
