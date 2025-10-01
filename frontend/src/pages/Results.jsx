import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Results() {
  const { examId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/answers/${examId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAnswers(res.data);
      } catch (err) {
        setError(err.response?.data.message || "Failed to fetch results");
      }
    };

    fetchAnswers();
  }, [examId]);

  return (
    <div className="container mt-5">
      <h2>Exam Results</h2>
      {error && <p className="text-danger">{error}</p>}

      {answers.length === 0 ? (
        <p>No answers submitted yet</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Question</th>
              <th>Your Answer</th>
            </tr>
          </thead>

          <tbody>
            {answers.map((a) => (
              <tr key={a._id}>
                <td>{a.question.text}</td>
                <td>{a.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Results;
