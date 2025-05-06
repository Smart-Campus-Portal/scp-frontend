import React, {useState} from 'react';
import '../../scss/Lecturer/up_timetable.css';

import dummyData from '../../dummyData';

const UpdateTimetable = () =>{

const [timetable, setTimetable] = useState(dummyData);
  const [editingClass, setEditingClass] = useState(null);

  const days = [...new Set(timetable.map(cls => cls.day))];
  const times = [...new Set(timetable.map(cls => cls.time))];

  const getClassAt = (day, time) =>
    timetable.find((cls) => cls.day === day && cls.time === time);

  const handleEdit = (cls) => {
    setEditingClass({ ...cls });
  };

  const handleAddClick = (day, time) => {
    setEditingClass({
      id: Date.now(),
      day,
      time,
      subject: '',
      location: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingClass((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setTimetable((prev) => {
      const exists = prev.find(cls => cls.id === editingClass.id);
      if (exists) {
        return prev.map(cls => cls.id === editingClass.id ? editingClass : cls);
      } else {
        return [...prev, editingClass];
      }
    });
    setEditingClass(null);
  };

  return (
    <>
        <div className='tt-page-layout'>
           

            <div className='tt-page-side'>
            

                <div className='tt-page-content'>
                    <div className='lect_timetable'>

                    <h2 className='tt-headings'>Lecturer Timetable</h2>

                    <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }} className='lect-timetable'>
                      <thead>
                        <tr>
                          <th>Time</th>
                            {days.map((day) => (
                          <th key={day}>{day}</th>
                            ))}
                        </tr>
                      </thead>

                      <tbody>
                            {times.map((time) => (
                        <tr key={time}>
                          <td><strong>{time}</strong></td>
                            {days.map((day) => {
                        const cls = getClassAt(day, time);

          return (
                      <td key={day}>
                        {cls ? (
                        <>
                          <strong>{cls.subject}</strong><br />
                            {cls.location}<br />
                            <button onClick={() => handleEdit(cls)} className='edit-btn'>Edit</button>
                          </>
                      ) : (
                    <>
                      <em>No class</em><br />
                      <button onClick={() => handleEdit({ day, time })} className='edit-btn'>Add</button>
                    </>
                    )}
                    </td>
                    );
                        })}
                        </tr>
                        ))}
                        </tbody>
                        </table>

                    {editingClass && (
                        <div className='edit-form-div'>
                            <form onSubmit={handleUpdate} style={{ marginTop: '20px' }} className='edit-form'>
                        <h3 className='tt-headings'>Edit Class</h3>

                    <input className='class-input'
                        name="subject"
                        value={editingClass.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                    /> <br/>

                    <input className='class-input'
                        name="day"
                        value={editingClass.day}
                        onChange={handleChange}
                        placeholder="Day"
                    /> <br/>

                    <input className='class-input'
                        name="time"
                        value={editingClass.time}
                        onChange={handleChange}
                        placeholder="Time"
                    /> <br/>

                    <input className='class-input'
                        name="location"
                        value={editingClass.location}
                        onChange={handleChange}
                        placeholder="Location"
                    /> <br/>

                    <button type="submit" className='save-btn'>Save</button>
                        </form>
                        </div>
                    )}

                    </div>
                </div>
            </div>
        </div>
    </>
  );
};
export default UpdateTimetable