# == Schema Information
#
# Table name: users
#
#  id                :bigint           not null, primary key
#  email             :string           not null
#  first_name        :string           not null
#  last_name_initial :string           not null
#  password_digest   :string           not null
#  session_token     :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, presence: true, length: { maximum: 30 }, format: { with: /\A[a-zA-Z]+\z/, message: "Only allows letters" }
  validates :last_name_initial, presence: true, length: { is: 1, message: "Must be exactly one character" }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  before_validation :ensure_session_token

  has_many :reviews, dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

    if user && user.authenticate(password)
      return user
    end
    nil
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.urlsafe_base64
      break token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

end
