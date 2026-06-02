import { useState } from "react";

const AdvisorDash = () => {
    const [projectTitle, setProjectTitle] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [description, setDescription] = useState("");
    const [assignedProjects, setAssignedProjects] = useState([]);

    const handleAssignProject = (e) => {
        e.preventDefault();

        const newProject = {
            id: Date.now(),
            title: projectTitle,
            student: studentEmail,
            description: description,
            status: 'Pending Verification'
        };

        setAssignedProjects([newProject, ...assignedProjects]);

        setProjectTitle("");
        setStudentEmail("");
        setDescription("");
    };

    return (
    <div className="advisor-dashboard">
      <header className="page-header">
        <h2>Advisor Management Panel</h2>
        <p>Instantiate original project guidelines and monitor academic progression pipelines.</p>
      </header>

      <div className="dashboard-grid">
        {/* Section A: Project Assignment Form */}
        <section className="form-section">
          <h3>Initialize Project Allocation</h3>
          <form onSubmit={handleAssignProject} className="allocation-form">
            
            <div className="form-group">
              <label>Project Operational Title</label>
              <input 
                type="text" 
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g., Cryptographic Authentication Module"
                required 
              />
            </div>

            <div className="form-group">
              <label>Target Student Institutional Email</label>
              <input 
                type="email" 
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="student@institution.edu"
                required 
              />
            </div>

            <div className="form-group">
              <label>Core Scope & Deliverables Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Outline core baseline objectives, methodologies, and milestones..."
                rows="5"
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Deploy Project Track
            </button>
          </form>
        </section>

        {/* Section B: Dynamic Active Roster Tracking */}
        <section className="roster-section">
          <h3>Active Allocated Trackers</h3>
          
          {assignedProjects.length === 0 ? (
            <div className="empty-state">
              <p>No active project scopes detected. Utilize the allocation control deck to onboard a student tracker.</p>
            </div>
          ) : (
            <div className="project-cards-container">
              {assignedProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="card-header">
                    <h4>{project.title}</h4>
                    <span className="badge-status-pending">{project.status}</span>
                  </div>
                  <p className="meta-student"><strong>Ownership:</strong> {project.student}</p>
                  <p className="card-desc">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdvisorDash;