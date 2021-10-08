class Exercise < ApplicationRecord
    
    has_one_attached :demo_pic, dependent: :destroy
    has_many_attached :demos, dependent: :destroy
    belongs_to :user

    validates :name, presence: true;
    validates :demo_pic, content_type: [:png, :jpg, :jpeg]
    validates :demos, content_type: [:png, :jpg, :jpeg]
    # validates :section, in: {%(none upper lower core)}

    # validates :demos, content_type: [:png, :jpg, :jpeg]
    # create validation for youtube_url
end
