class ExperimentController <ApplicationController
	respond_to :js, :json, :html
	def login
		@subject = Subject.new
	end
	def quiz
		@subject = Subject.new(:keycode => params[:subject][:keycode],:date_time => DateTime.now, :question => params[:data])
		@subject.save
	end
	def admin
		@subjects = Subject.all
		# for subject in @subjects
		# 	# CSV.generate do |csv|
		# 	subject[0]

	end

end