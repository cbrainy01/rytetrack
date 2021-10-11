class ExerciseSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  belongs_to :user
  attributes :id, :name, :description, :is_cardio, :demos, :youtube_url, :timestamp, :section, :user_id
  # add user_id attribute  :demo_pic,


  def user_id
    self.object.user.id
  end

  # def demos
  #   links = []
  #   if object.demos.attached?
  #     object.demos.each do |demo|
  #     # links << url_for(demo, only_path: true)
  #     links << rails_blob_path(demo, only_path: true)
  #     end
  #   end
  #   links
  #   # byebug
  # end

  def demos
    return unless object.demos.attached?
    links = []
    object.demos.map do |demo|
      links << demo.blob.attributes.slice('filename', 'byte_size', 'id').merge(url: demo_url(demo))
    end
    links
    # byebug
  end

  # def demo_pic
  #   if object.demo_pic.attached?
  #     url = rails_blob_path(object.demo_pic , only_path: true)
  #     # byebug
  #     url
  #     # object.demo_pic.blob.attributes
  #     # .slice('filename', 'byte_size', 'id').merge(url: demo_pic_url(demo_pic)) 
      
  #     # set above to a variable and byebug 
  #   else "https://www.mcdonalds.com/content/dam/ca/nfl/web/nutrition/products/tile/en/mcdonalds-fries-small.jpg"
      
  #     # byebug 
  #   # return demo_pic.blob.attributes
  #   end
    
  # end

  def demo_url(image)
    rails_blob_path(image, only_path: true)
    # url_for(image)
  end

end
