import React, { useState } from 'react'
import { toast, ToastContainer} from 'react-toastify';
import Navbar from '../../Components/Navbar/navbar'
import Sidebar from '../../Components/Sidebar/sidebar'
import '../../scss/Lecturer/lect_report.css';

const LecturerReportIssue = () => {

const [issueType, setIssueType] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const issueData = {
      issueType,
      priority,
      description,
      reportedAt: new Date().toISOString()
    };

    console.log('Issue submitted:', issueData);

    toast.success('✅ Issue reported successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });

    // Reset form
    setIssueType('');
    setPriority('');
    setDescription('');
  };

  return (
    <div className='lect-rep-layout'>
            <Navbar/>

            <div className='lect-rep-side'>
                <Sidebar/>

                <div className='lect-rep-content'>

                    <div className='rep-form-container'>

                        <form className="issue-form" onSubmit={handleSubmit}>
                            <h2 className='rep-form-heading'>REPORT AN ISSUE</h2>
                            <p className='rep-form-desc'>If you're experiencing any issues related to lectures, lecturers, or facilities, please submit them below.</p>

                            <label className='rep-form-lbl'>Issue Type:</label> <br/>
                            <select className='rep-form-input' value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
                                <option value="">-- Select an issue --</option>
                                <option value="System Error">System Error</option>
                                <option value="Missing Timetable">Missing Timetable</option>
                                <option value="Classroom Problem">Classroom Problem</option>
                                <option value="Login Issues">Login Issues</option>
                                <option value="Appointment Error">Appointment Error</option>
                                <option value="Other">Other</option>
                            </select> <br/>

                            <label className='rep-form-lbl'>Priority:</label> <br/>
                            <select className='rep-form-input' value={priority} onChange={(e) => setPriority(e.target.value)} required>
                                <option value="">-- Select priority --</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select> <br/>

                            <label className='rep-form-lbl'>Description:</label> <br/>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="4"
                                    className='rep-form-input'
                                    placeholder="Describe the issue in detail..."
                                    required
                                ></textarea> <br/>

                        <button type="submit" className='rep-sub-btn'>Submit Issue</button>
                        </form>

                            <ToastContainer />
                    </div>
                </div>
            </div>
    </div>
  )
}
export default LecturerReportIssue