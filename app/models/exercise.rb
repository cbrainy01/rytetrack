class Exercise < ApplicationRecord
    validates :name, presence: true;
    has_one_attached :demo_pic, dependent: :destroy
    validates :demo_pic, content_type: [:png, :jpg, :jpeg]
end
