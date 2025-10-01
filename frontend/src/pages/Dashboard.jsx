import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/"); // redirect to login if no token
          return;
        }

        const res = await axios.get("http://localhost:5000/api/exams", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExams(res.data);
      } catch (err) {
        setError(err.response?.data.message || "Failed to fetch exams");
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      {error && <p className="text-danger">{error}</p>}
      {exams.length === 0 ? (
        <p>No exams available</p>
      ) : (
        <ul className="list-group">
          {exams.map((exam) => (
            <li
              key={exam._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {exam.title} - {new Date(exam.date).toLocaleString()}
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate(`/exam/${exam._id}`)}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
