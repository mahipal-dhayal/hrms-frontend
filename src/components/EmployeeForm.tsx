import { useState } from "react";
import API from "../api/api";
import axios from "axios";
const EmployeeForm = () => {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await API.post("/employees", form);

      alert(res.data.message);
      //   window.location.reload();
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
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
      <h2 className="text-xl font-semibold mb-4">Add Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 rounded"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 rounded"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 rounded"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
