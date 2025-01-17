import './App.css';
import { Route, Routes } from "react-router-dom";
import PasswordRecovery from "./pages/auth/PasswordRecovery.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import ScheduleSetting from "./pages/Dashboard/Staff/ScheduleSetting.jsx";
import Success from "./components/Success/Success.jsx";
import StudentAdmission from "./pages/Dashboard/Students/Admission/Admission3.jsx";
import ProtectedRoute from './utils/ProtectedRoutes.jsx'; // Import the ProtectedRoute component
import Events from "./pages/Dashboard/Events/Events.jsx";
import StaffList from "./pages/Dashboard/Staff/ViewStaff.jsx";
import ToAnotherClass from './pages/Dashboard/Students/Transfer/ToAnotherClass.jsx';
import ToAnotherSchool from "./pages/Dashboard/Students/Transfer/ToAnotherSchool.jsx";
import MarkAttendance from "./pages/Dashboard/Students/Attendance/MarkAttendance.jsx";
// import FindLearner from "./pages/Dashboard/Students/FindLearner.jsx";
import CreateDepartment from './pages/Dashboard/Department/CreatDepartment.jsx';
import NewStaff from "./pages/Dashboard/Staff/NewStaff.jsx";
import NewPatient from "./pages/Dashboard/Clinic/NewPatient.jsx";
import NewBook from "./pages/Dashboard/Library/NewBook.jsx";
import CreateCourseBook from "./pages/Dashboard/CourseBook/CreateCourseBook.jsx";
import ViewDepartments from "./pages/Dashboard/Department/ViewDepartments.jsx";
import Dashboard from "./pages/Dashboard/Index.jsx";
import NewProcurement from "./pages/Dashboard/Procurement/NewProcurement.jsx";
import CreatClassroom from "./pages/Dashboard/classrooms/CreatClassroom.jsx";
import LeaseBook from "./pages/Dashboard/Library/LeaseBook.jsx";
import UnreturnedBooks from "./pages/Dashboard/Library/UnreturnedBooks.jsx";
import { DashboardProvider } from "./pages/Dashboard/Dashboard.jsx";
import AllClasses from "./pages/Dashboard/classrooms/AllGradeList.jsx";
import FeeSetting from "./pages/Dashboard/fee/FeeSetting.jsx";
import TeacherProfile from "./pages/Dashboard/Staff/Profile.jsx";
import FeeStructure from "./pages/Dashboard/fee/FeeStructure.jsx";
import FeeItemsList from "./pages/Dashboard/fee/feeItem/FeeItemsList.jsx";
import DarkLoginPage from "./components/DarkThemeLogin.jsx";
import CreateVacancy from "./pages/Dashboard/HumanResurce/Vacancies/CreateVacancy.jsx";
import ViewVacancies from "./pages/Dashboard/HumanResurce/Vacancies/ViewVacancies.jsx";
import Interviews from "./pages/Dashboard/HumanResurce/Interviews/Interviews.jsx";
import NewComplaint from "./pages/Dashboard/HumanResurce/Compaints/NewComplaint.jsx";
import ViewComplaints from "./pages/Dashboard/HumanResurce/Compaints/ViewComplaints.jsx";
import NewPayroll from "./pages/Dashboard/HumanResurce/payroll/NewPayroll.jsx";
import Payrolls from "./pages/Dashboard/HumanResurce/payroll/Payrolls.jsx";
import LearnerProfile from "./components/Profile.jsx";
import {NewAssessment} from "./pages/Dashboard/Assesment/NewAssessment.jsx";
import ViewAssessments from "./pages/Dashboard/Assesment/ViewAssessments.jsx";
import TermDates from "./pages/Dashboard/policies/termDates/TermDates.jsx";
import CaptureScores from "./pages/Dashboard/Assesment/CaptureScores.jsx";
import AssessmentReport from "./pages/Dashboard/Assesment/AssessmentReport.jsx";

function App() {
  // const { light, dark, lightTheme } = useTheme();
  // const theme = !lightTheme ? light : dark;

  return (
      <div style={{  minHeight: '100vh', display: "flex", alignItems: "center", justifyContent: "center" }} className="App">

        <Routes>
          <Route path="/login" element={<DarkLoginPage />} />
          <Route path="/getCode" element={<PasswordRecovery />} />
          <Route path="/changePassword" element={<ResetPassword />} />


          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardProvider />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/admit-learner" element={<StudentAdmission />} />
              <Route path='/schedule-setting' element={<ScheduleSetting/>}/>
              <Route path="/succ" element={<Success />} />
              <Route path="/transfer-to-class" element={<ToAnotherClass />} />
              <Route path="/transfer-to-school" element={<ToAnotherSchool />} />
              <Route path="/create-department" element={<CreateDepartment />} />
              <Route path="/new-staff" element={<NewStaff />} />
              <Route path="/new-patient" element={<NewPatient />} />
              <Route path="/find-learner" element={<LearnerProfile />} />
              <Route path="/mark-attendance" element={<MarkAttendance />} />
              <Route path="/add-book" element={<NewBook />} />
              <Route path="/create-course-book" element={<CreateCourseBook />} />
              <Route path="/view-departments" element={<ViewDepartments />} />
              <Route path="/new-item" element={<NewProcurement />} />
              <Route path="/create-class" element={<CreatClassroom />} />
              <Route path="/lease-book" element={<LeaseBook />} />
              <Route path="/view-leased-books" element={<UnreturnedBooks />} />
              <Route path="/view-staff" element={<StaffList />} />
              <Route path="/view-class" element={<AllClasses />} />
              <Route path="/fee-setting" element={<FeeSetting />} />
              <Route path="/profile" element={<TeacherProfile />} />
              <Route path="/new-feeStructure" element={<FeeStructure />} />
              <Route path="/view-feeItem" element={<FeeItemsList />} />
              <Route path='/new-vacancy' element={<CreateVacancy/>}/>
              <Route path='/vacancies' element={<ViewVacancies/>}/>
              <Route path='/interviews' element={<Interviews />}/>
              <Route path='/new-complaint' element={<NewComplaint />}/>
              <Route path='/complaints' element={<ViewComplaints />}/>
              <Route path='/new-payroll' element={<NewPayroll />}/>
              <Route path='/payrolls' element={<Payrolls />}/>
              <Route path='/new-assessment' element={<NewAssessment />}/>
              <Route path='/view-assessment' element={<ViewAssessments />}/>
              <Route path='/capture-scores' element={<CaptureScores />}/>
              <Route path={'/assessment-report'} element={<AssessmentReport/>} />
              <Route path='/term-dates' element={<TermDates />}/>
            </Route>
          </Route>
        </Routes>
      </div>
  );
}

export default App;
