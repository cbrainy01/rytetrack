class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :session_id, :exercise_id, :sets, :exercise_name, :weight, :birack, :reps, :weight, :notes, :rest_time, :difficulty, :avg_speed, :avg_incline, :miles, :bar, :rest_time_string, :plate_arrangement, :session_date, :exercise_section, :is_cardio

 
  def is_cardio
    self.object.exercise.is_cardio
  end

  def exercise_section
    self.object.exercise.section
  end

  def session_date
    self.object.session.date
  end

  def exercise_name
    self.object.exercise.name
  end

  def is_cardio
    self.object.exercise.is_cardio
  end

  def rest_time_string
    if self.object.rest_time
      time_in_seconds = self.object.rest_time
    mins = time_in_seconds.divmod(60)[0]
    secs = time_in_seconds.divmod(60)[1]
    "#{mins}:#{secs}"
    else 
      nil
    end
    
  end

  def plate_arrangement
    # byebug
    storage_unit = {}
    plates = [ "35", "25", "10", "5", "2.5" ]
    initial_weight = self.object.weight.to_f
    
    if self.object.bar
      initial_weight = self.object.weight.to_f - self.object.bar 
      else initial_weight = self.object.weight.to_f
    end
    #  initial_weight = self.object.weight.to_f - self.object.bar
    if self.object.birack 
      weight = initial_weight / 2
    else 
      weight = initial_weight
    end
    
    # byebug

    num_of_plates_for_45 = weight.divmod(45)[0]
    remainder = weight.divmod(45)[1]
    storage_unit["45"] = num_of_plates_for_45

    plates.each do |plate|
      if remainder != 0 
        num_of_plates = remainder.divmod(plate.to_i)[0]
        remainder = remainder.divmod(plate.to_i)[1]
        storage_unit[plate] = num_of_plates
      else
        storage_unit[plate] = 0
      end
    end

    storage_unit
  end


end
