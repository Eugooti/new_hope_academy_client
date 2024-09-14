const initialState={
    auth:{
        error: null,
        isLoggedIn: false,
        user: null,
        staffId:null,
        loading: false,
        change_password_data:null,
        check_code_data:null,
        sign_up_data:null,
        forgot_password_data:null,
        update_user_data:null,
        booking_data:null
    },
    library:{
        loading: false,
        error: null,
        library_data:null,
        all_books:null
    },
    coursebook:{
        loading:false,
        error:null,
        coursebook: null,
        coursebooks:null
    },
    bookBorrowing:{
        unreturnedBooks:[],
        borrowingRecord:null,
        loading:false,
        error:null,
        leaseRecord:[],
        borrowing_response:null,
        return_response:null,
        learner_data:null
    },
    clinic:{
        loading: false,
        error: null,
        learner_data:null,
        learnersRecord:null
    },
    learner:{
        loading: false,
        error: null,
        learner_data:null,
        learners_list:null,
    },
    timetable:{
        loading: false,
        error: null,
        timetable_data:null,
    },
    staff:{
        loading: false,
        error: null,
        staff_data:null,
        staffList:null
    },
    role:{
        loading:false,
        error: null,
        role_data:null,
        roles:null
    },
    classrooms:{
        loading:false,
        error: null,
        classroom_data:null,
        classroomList:null
    },
    events:{
        loading:false,
        error: null,
        events_data:null,
        events: null
    },
    department:{
        loading:false,
        error:null,
        departmentData:null,
        departments:null
    },
    procurement:{
        loading:false,
        error:null,
        procurement_data:null,
        procurements: null
    },
    attendance:{
        loading:false,
        error:null,
        learner_data:null,
        learners_list: null
    },
    fee:{
        feeItem:null,
        loading:false,
        error:null,
        feeItems:null,
        feeStructure:null,
        feeStructureList:null
    },
    schedule: {
        loading:false,
        userSchedules:null,
        createdSchedule:null,
        error:null
    },
    human_resource:{
        loading:false,
        error:null,
        vacancy:null,
        vacanciesList:null,
        complaint:null,
        complaintsList:null,
        interview:null,
        interviewList:null,
        payroll:null,
        payrollList:null,
        staffAttendance:null,
        staffAttendanceList:null,
    }

}

export default initialState;
