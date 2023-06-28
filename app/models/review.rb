# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  body        :text             not null
#  rating      :integer          not null
#  user_id     :bigint           not null
#  business_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Review < ApplicationRecord
    validates :body, :rating, presence: true
    validates :rating, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }

    belongs_to :user
    belongs_to :business

    def user_info
        user = self.user
        return "#{user.first_name} #{user.last_name_initial}."
    end

    def business_name
        business = self.business
        return "#{business.name}"
    end

end
