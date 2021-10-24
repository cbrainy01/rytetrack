class Exercise < ApplicationRecord
    
    has_one_attached :demo_pic, dependent: :destroy
    has_many_attached :demos, dependent: :destroy
    belongs_to :user

    validates :name, presence: true, length: {maximum: 40};
    validates :demo_pic, content_type: [:png, :jpg, :jpeg]
    validates :demos, content_type: [:png, :jpg, :jpeg]

    validates :section, presence: true;

    # validates :section, in: {%(none upper lower full core)}

    # validates :demos, content_type: [:png, :jpg, :jpeg]
    # create validation for youtube_url
    # create validation for name. Has to be unique for that user
end
