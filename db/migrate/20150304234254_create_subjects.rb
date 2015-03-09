class CreateSubjects < ActiveRecord::Migration
  def change
    create_table :subjects do |t|
    	t.string	  :keycode
    	t.string	  :date_time
      t.string    :question
      t.string    :questionB
    	# t.string		:question, array:true, default: []
    	# t.string		:questionB, array:true, default: []
      t.timestamps
    end
  end
end
