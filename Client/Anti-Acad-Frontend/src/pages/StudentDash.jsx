import { useState } from 'react';

const StudentDash = () => {
    const [project, setProject] = useState({
        title: 'Cryptographic Authentication Module',
        advisor: 'Dr. Smith',
        description: 'Develop a secure authentication system using cryptographic techniques.',
        status: 'Pending Verification',
        isAccepted: false
    });

    const [milestoneText, setMilestoneText] = useState('');
    const [timeline, setTimeline] = useState([
        { milestone: 'Project Proposal', status: 'Completed' },
        { milestone: 'Literature Review', status: 'Completed' },
        { milestone: 'System Design', status: 'In Progress' },
        { milestone: 'Implementation', status: 'Pending' },
        { milestone: 'Testing & Evaluation', status: 'Pending' }
    ]);
    const handleAcceptProject = () => {
    setProject({ ...project, isAccepted: true });
  };

  const handleMilestoneSubmit = (e) => {
    e.preventDefault();
    if (!milestoneText.trim()) return;

    const newMilestone = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      activity: milestoneText,
      status: 'Pending Review'
    };

    setTimeline([newMilestone, ...timeline]);
    setMilestoneText('');
  };

  return (
    <div className="student-dashboard">
      <header className="page-header">
        <h2>Student Workspace Hub</h2>
        <p>Document regular micro-progress metrics to safeguard project ownership integrity.</p>
      </header>

      {!project.isAccepted ? (
        /* State 1: Awaiting Project Confirmation Contract */
        <div className="activation-banner">
          <div className="banner-content">
            <h3>Pending Project Assignment Detected</h3>
            <p><strong>Project:</strong> {project.title}</p>
            <p><strong>Issued By:</strong> {project.advisor}</p>
            <p className="banner-desc">{project.description}</p>
          </div>
          <button onClick={handleAcceptProject} className="btn-activate">
            Accept Track & Confirm Ownership
          </button>
        </div>
      ) : (
        /* State 2: Active Tracking Workspace Grid */
        <div className="dashboard-grid">
          
          {/* Left Column: Log a new Milestone Entry */}
          <section className="logging-section">
            <h3>Log Incremental Progress</h3>
            <form onSubmit={handleMilestoneSubmit} className="milestone-form">
              <div className="form-group">
                <label>What exact code block or feature layer did you build today?</label>
                <textarea
                  value={milestoneText}
                  onChange={(e) => setMilestoneText(e.target.value)}
                  placeholder="Describe your logical steps, issues resolved, or terminal outputs. Be specific to prove incremental work..."
                  rows="6"
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Commit Progress Entry
              </button>
            </form>

            <div className="meta-sidebar">
              <h4>Active Contract Bounds</h4>
              <p><strong>Track Name:</strong> {project.title}</p>
              <p><strong>Review Guide:</strong> {project.advisor}</p>
            </div>
          </section>

          {/* Right Column: Historical Verification Timeline Stream */}
          <section className="timeline-section">
            <h3>Your Authenticity Verification Log</h3>
            <div className="timeline-stream">
              {timeline.map((log) => (
                <div key={log.id} className="timeline-card">
                  <div className="timeline-meta">
                    <span className="log-date">{log.date}</span>
                    <span className={`badge-status ${log.status.toLowerCase().replace(' ', '-')}`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="log-text">{log.activity}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}
    </div>
  );
};

export default StudentDash;