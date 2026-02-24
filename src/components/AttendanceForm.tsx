import { useState } from "react";
import API from "../api/api";
import axios from "axios";
const AttendanceForm = () => {
  const [data, setData] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await API.post("/attendance", data);

      alert(res.data.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail || "Request failed");
      } else {
        alert("Unexpected error");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Employee ID"
          value={data.employee_id}
          onChange={(e) => setData({ ...data, employee_id: e.target.value })}
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value })}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
