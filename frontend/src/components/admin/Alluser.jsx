import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const Alluser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    axios.get("/allskill")
      .then(res => {
        setUsers(res.data.data);
        console.log(setUsers)
        const skills = new Set();
        res.data.data.forEach(user => {
          user.proficientSkills?.forEach(skill => skills.add(skill));
        });
        setAllSkills([...skills]);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    // TODO: Connect to backend
    alert(`Delete user with ID: ${id}`);
  };

  const handleWarning = (id) => {
    // TODO: Connect to backend
    alert(`Send warning to user ID: ${id}`);
  };

  const filteredUsers = users.filter(user => {
    const matchesName = (user.full_name || "").toLowerCase().includes(search.toLowerCase());
    const matchesSkill = !filterSkill || user.proficientSkills?.includes(filterSkill);
    return matchesName && matchesSkill;
  });

  return (
    <>
    <AdminNavbar></AdminNavbar>
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
          >
            <option value="">Filter by skill</option>
            {allSkills.map((skill, idx) => (
              <option key={idx} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredUsers.map(user => (
          <div key={user._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.userId.full_name}</h5>
                <p><strong>Email:</strong> {user.userId.email}</p>
                <p><strong>Phone:</strong> {user.userId.phone}</p>
                <p><strong>Specification:</strong> {user.specification}</p>
                <p><strong>Proficient Skills:</strong> {user.proficientSkills?.join(", ")}</p>
                <p><strong>Skills to Learn:</strong> {user.skillsToLearn?.join(", ")}</p>
                <p><strong>LinkedIn:</strong> <a href={user.linkedin} target="_blank" rel="noreferrer">{user.linkedin}</a></p>
                <p><strong>GitHub:</strong> <a href={user.github} target="_blank" rel="noreferrer">{user.github}</a></p>
                <p><strong>Portfolio:</strong> <a href={user.portfolio} target="_blank" rel="noreferrer">{user.portfolio}</a></p>

                {/* <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>Delete</button>
                  <button className="btn btn-warning btn-sm" onClick={() => handleWarning(user._id)}>Send Warning</button>
                </div> */}
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="col-12 text-center text-muted mt-4">
            <p>No users found.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Alluser;
