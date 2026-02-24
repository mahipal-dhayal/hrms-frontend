import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceList from "./components/AttendanceList";
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        HRMS Lite
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <EmployeeForm />
        <AttendanceForm />
      </div>

      <div className="mt-6">
        <EmployeeList />
        <AttendanceList />
      </div>
    </div>
  );
}

export default App;