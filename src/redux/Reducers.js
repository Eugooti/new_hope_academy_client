import { combineReducers } from "redux";
import initialState from "./state.js";
import libraryReducer from './Reducers/appSlice/librarySlice.js';
import eventsReducer from './Reducers/appSlice/eventsSlice.js'
import authReducer from './Reducers/authSlice.js'
import bookBorrowingReducer from "./Reducers/appSlice/booksBorrowingSlice.js";
import staffSlice from "./Reducers/AdminSlice/staffSlice.js";
import rolesSlice from "./Reducers/AdminSlice/RolesSlice.js";
import classSlice from "./Reducers/AdminSlice/classSlice.js";
import procurementSlice from "./Reducers/appSlice/procurementSlice.js";
import courseBookSlice from "./Reducers/appSlice/courseBookSlice.js";
import clinicSlice from "./Reducers/AdminSlice/clinicSlice.js";
import departmentSlice from "./Reducers/AdminSlice/departmentSlice.js";
import learnerSlice from "./Reducers/AdminSlice/LearnerSlice.js";
import attendanceSlice from "./Reducers/AdminSlice/attendanceSlice.js";
import feeSlice from "./Reducers/AdminSlice/FeeSlice.js";
import scheduleSlice from "./Reducers/AdminSlice/scheduleSlice.js";
import batchRequests from './Reducers/AdminSlice/batchRequestSlice.js'
import vacancySlice from "./Reducers/hrmSlice/vacancySlice.js";
import complaintsSlice from "./Reducers/hrmSlice/complaintsSlice.js";
import payrollSlice from "./Reducers/hrmSlice/payrollSlice.js";
import interviewsSlice from "./Reducers/hrmSlice/interviewsSlice.js";
import assessmentSlice from "./Reducers/AdminSlice/assessmentSlice.js";


const rootReducers = combineReducers({
    library: libraryReducer,
    events: eventsReducer,
    auth:authReducer,
    bookBorrowing:bookBorrowingReducer,
    staff:staffSlice,
    roles:rolesSlice,
    classroom:classSlice,
    procurement:procurementSlice,
    coursebooks:courseBookSlice,
    clinic:clinicSlice,
    department:departmentSlice,
    learners:learnerSlice,
    attendance:attendanceSlice,
    fee:feeSlice,
    schedule:scheduleSlice,
    batchRequests:batchRequests,
    vacancies:vacancySlice,
    complaints:complaintsSlice,
    payroll:payrollSlice,
    interview:interviewsSlice,
    assessment:assessmentSlice
});

export default (state = initialState, action) => rootReducers(state, action);
