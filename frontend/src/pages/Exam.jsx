import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

function Exam() {
    const {id} = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions =async () => {
            try {
                const token = localStorage.getItem("token");
                if(!token) {
                    navigate("/");
                    return;

                }

                const res = await axios.get(`http://localhost:5000/api/questions/${id}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });

                setQuestions(res.data);
            }
            catch(err) {
                setError(err.response ? err.response.data.message :"Failed to fetch questions");
            }
        };

        fetchQuestions();
    }, [id]);

    const handleChange = (questionId, value) => {
        setAnswers({...answers, [questionId]: value});

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                navigate("/");
                return;
            }

            const res = await Promise.all(
                questions.map((q) => 
                    axios.post("http://localhost:5000/api/answers",
                        {exam: id,
                        question: q._id,
                        answer: answers[q._id] || "",
                        },
                        {
                            headers: {Authorization: `Bearer ${token}`},
                        }
                    )
                )
            );

            alert("Answer Submitted Succefully");
            navigate("/dashboard");

        }
        catch(err) {
            setError(err.response?.data.message || "Failed to submit Answer");
        }
    };

    return (
    <div className="container mt-5">
      <h2>Exam</h2>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={q._id} className="mb-3">
            <label className="form-label">
              {index + 1}. {q.text}
            </label>
            {q.type === "text" ? (
              <input
                type="text"
                className="form-control"
                value={answers[q._id] || ""}
                onChange={(e) => handleChange(q._id, e.target.value)}
              />
            ) : (
              <select
                className="form-select"
                value={answers[q._id] || ""}
                onChange={(e) => handleChange(q._id, e.target.value)}
              >
                <option value="">Select answer</option>
                {q.options?.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-success">
          Submit Answers
        </button>
      </form>
    </div>
  );
}

export default Exam;