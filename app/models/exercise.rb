class Exercise < ApplicationRecord
    validates :name, presence: true;
    has_many_attached :demo_pics, dependent: :destroy
        validates :demo_pics, content_type: [:png, :jpg, :jpeg]
end
