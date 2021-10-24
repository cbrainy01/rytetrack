class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :email, :exercises, :workouts
  # , :chart_info
  has_many :exercises
  has_many :sessions
  has_many :workouts, through: :sessions
  
  

  # def chart_info
  #   # byebug
  #   # try to acess workouts by self.object.workouts, then try to access that workouts sessions, 
  #   months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  #   year = "2021"
  #   data_upper = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
  #   data_lower = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
  #   data_full = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
  #   data_cardio = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
  #   data_core = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
  #   # date layout "2021-10-13", "2018-06-08"
  #   workouts = self.object.workouts
  #   # workouts = Workout.where(user_id: self.object.id)
  #   workouts.each do |workout|
     
  #     wo_month = Session.find(workout.session_id).date.to_s.split("-")[1]
  #     wo_year = Session.find(workout.session_id).date.to_s.split("-")[0]
      
  #     # wo_month = workout.session.date.split("-")[1]
  #     # wo_year = Session.find(workout.session_id).date.split(":")[0]
  #     # wo_year = workout.session.date.split("-")[0]

  #     months.each do |month|
  #       if workout.exercise.section == "upper" && wo_month == month && wo_year == "2021"
  #         data_upper[month] += 1
  #       elsif workout.exercise.section == "lower" && wo_month == month && wo_year == "2021"
  #         data_lower[month] += 1
  #       elsif workout.exercise.section == "full" && wo_month == month && wo_year == "2021"
  #         data_full[month] += 1
  #       elsif workout.exercise.section == "core" && wo_month == month && wo_year == "2021"
  #         data_core[month] += 1
  #       # elsif workout.exercise.is_cardio == true && wo_month == month && wo_year == "2021"
  #       #   data_cardio[month] += 1
  #       end
        
  #     end
      
  #   end

  #   puts "data_upper: ", data_upper
  #   puts "data_lower: ", data_lower
  #   puts "data_full: ", data_full
  #   puts "data_cardio: ", data_cardio
  #   puts "data_core: ", data_core
  #   # if workout.exercise.section === "upper" and workout.session.date split to get month === current date, increment upper for that month by one
  #   "work in progress"
  # end






end
