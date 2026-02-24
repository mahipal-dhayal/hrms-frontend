import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api/api";

interface Employee {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}

interface Attendance {
  status: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceCount, setAttendanceCount] = useState<
    Record<string, number>
  >({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/employees");
        const empList = res.data.data;

        setEmployees(empList);

        // Fetch attendance count for each employee
        empList.forEach((emp: Employee) => {
          fetchAttendanceCount(emp.employee_id);
        });
      } catch (err) {
        console.error("Failed to load employees", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Get present days count
  const fetchAttendanceCount = async (id: string) => {
    try {
      const res = await API.get(`/attendance/${id}`);

      const records: Attendance[] = res.data.data || [];

      const presentDays = records.filter(
        (rec) => rec.status === "Present"
      ).length;

      setAttendanceCount((prev) => ({
        ...prev,
        [id]: presentDays,
      }));
    } catch {
      setAttendanceCount((prev) => ({
        ...prev,
        [id]: 0,
      }));
    }
  };

  // Delete employee
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      const res = await API.delete(`/employees/${id}`);

      alert(res.data.message);

      setEmployees((prev) =>
        prev.filter((emp) => emp.employee_id !== id)
      );
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail || "Delete failed");
      } else {
        alert("Unexpected error");
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        Loading employees...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Employees
      </h2>

      {employees.length === 0 ? (
        <p className="text-gray-500">No employees found</p>
      ) : (
        <div className="space-y-3">
          {employees.map((emp) => (
            <div
              key={emp.employee_id}
              className="border p-3 rounded flex justify-between items-center"
            >
              {/* Employee Info */}
              <div>
                <p className="font-medium">
                  {emp.full_name}
                </p>

                <p className="text-sm text-gray-500">
                  {emp.email} | {emp.department} | {emp.employee_id}
                </p>

                {/* Attendance Count */}
                <p className="text-sm text-green-600 mt-1">
                  Present:{" "}
                  {attendanceCount[emp.employee_id] ?? 0} Days
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() =>
                  handleDelete(emp.employee_id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;