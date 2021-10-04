class ShowexerciseSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :description, :demo_pic, :is_cardio

  # def demo_pic
  #   if object.demo_pic.attached?
  #     demo_pic.blob.attributes
  #     .slice('filename', 'byte_size', 'id')
  #     .merge(url: demo_pic_url(demo_pic))  
  #   return demo_pic.blob.attributes
  #   end
    
  # end

  # def demo_pic_url(image)
  #   # rails_blob_path(image, only_path: true)
  #   url_for(image)
    
  # end
end
