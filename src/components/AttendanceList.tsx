import { useState } from "react";
import axios from "axios";
import API from "../api/api";

interface Attendance {
  employee_id: string;
  date: string;
  status: string;
}

const AttendanceList = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    if (!employeeId) {
      alert("Enter Employee ID");
      return;
    }

    setLoading(true);

    try {
      const res = await API.get(`/attendance/${employeeId}`);
      setRecords(res.data.data || []);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail || "Failed to load attendance");
      } else {
        alert("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">
        View Attendance
      </h2>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Enter Employee ID (EMP001)"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <button
          onClick={fetchAttendance}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          View
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Records */}
      {!loading && records.length === 0 && (
        <p className="text-gray-500">
          No attendance records found
        </p>
      )}

      {!loading && records.length > 0 && (
        <table className="w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((rec, index) => (
              <tr key={index}>
                <td className="border p-2">
                  {new Date(rec.date).toLocaleDateString()}
                </td>
                <td
                  className={`border p-2 font-medium ${
                    rec.status === "Present"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {rec.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceList;