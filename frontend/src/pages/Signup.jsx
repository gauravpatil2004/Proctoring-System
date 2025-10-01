import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                name, email, password, role
            });

            alert("Signup Successfull please Login");
            navigate("/");
        }
        catch(err) {
            setError(err.response?.data.message || "Server Error");
        }


    };

    return (
        <div className="container mt-5">
            <h2>Signup</h2>
            <form action="" onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-success">Signup</button>
            </form>
        </div>
    );
}

export default Signup;