class Exercise < ApplicationRecord
    # validates :name, presence: true;
    has_one_attached :demo_pic, dependent: :destroy
    has_many_attached :demos, dependent: :destroy
    validates :demo_pic, content_type: [:png, :jpg, :jpeg]
    # validates :demo, content_type: [:png, :jpg, :jpeg]
end
