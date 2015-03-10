class ExperimentController <ApplicationController
	respond_to :js, :json, :html
	def login
		@subject = Subject.new
	end
	def quiz
		# @subject = Subject.new(:keycode => se,:date_time => DateTime.now, :question => params[:data])
		#binding.pry()
		# @subject.save
	end
	def reading
	end
	def admin
		@subjects = Subject.all
		# for subject in @subjects
		# 	# CSV.generate do |csv|
		# 	subject[0]

	end

end