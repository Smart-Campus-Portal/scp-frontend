import React, {useState} from 'react';
import '../../scss/Lecturer/view_timetable.css';
import Navbar from '../../Components/Navbar/navbar';
import Sidebar from '../../Components/Sidebar/sidebar';
import dummyData from '../../dummyData';

const getUnique = (arr, key) => [...new Set(arr.map(item => item[key]))];

const ViewTimetable = () => {

const days = getUnique(dummyData, 'day');
const times = getUnique(dummyData, 'time').sort(); 

const getClassAt = (day, time) =>
dummyData.find(cls => cls.day === day && cls.time === time);

  return (
    <>
        <div className='view-tt-layout'>
            <Navbar/>

            <div className='view-tt-side'>
                <Sidebar/>

                <div className='view-tt-content'>
                    <div className='tt-view'>

                    <h2 className='tt-headings'>Lecturer Timetable</h2>
                    <table
                        border="1"
                        cellPadding="10"
                        className='lec-timetable'
                        style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}
                    >

                        <thead>
                            <tr>
                            <th>Time</th>
                            {days.map(day => (
                            <th key={day}>{day}</th>
                            ))}
                            </tr>
                        </thead>

                        <tbody>
                            {times.map(time => (
                            <tr key={time}>
                            <td><strong>{time}</strong></td>
                            {days.map(day => {
                            const cls = getClassAt(day, time);
                            return (
                            <td key={day}>
                            {cls ? (
                      <>
                        <div><strong>{cls.subject}</strong></div>
                        <div>{cls.location}</div>
                      </>
                        ) : (
                        '-'
                        )}
                        </td>
                            );
                            })}
                            </tr>
                            ))}
                        </tbody>
                    </table>

                    </div>
                </div>
            </div>
        </div>

    </>
  );
};

export default ViewTimetable