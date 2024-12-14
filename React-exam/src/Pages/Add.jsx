import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Component/Header';

function Add() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("active"); 
    const [courses, setCourses] = useState([]);
    const [record, setRecord] = useState([]);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('users')) || [];
        setRecord(data);
    }, []);

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCourses([...courses, value]);
        } else {
            setCourses(courses.filter((course) => course !== value));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !email || !status || courses.length === 0) {
            toast.error("All fields are required, including at least one course.");
            return false;
        }

        let obj = {
            id: Math.floor(Math.random() * 10000),
            name,
            phone,
            email,
            status,
            courses
        };

        let newRecord = [...record, obj];
        localStorage.setItem('users', JSON.stringify(newRecord));
        setRecord(newRecord);
        toast.success("Successfully added...");
        setName("");
        setPhone("");
        setEmail("");
        setStatus("active");
        setCourses([]);
    };

    return (
        <div>
            <Header />
            <div className="container" style={{ margin: "20px 100px", color: "white" }}>
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <form onSubmit={handleSubmit} className='p-5 shadow border-0 rounded-4'>
                            <div className="mb-3">
                                <label className="form-label" style={{ fontSize: "20px" }}>Name</label>
                                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{ fontSize: "20px" }}>Phone</label>
                                <input type="text" className="form-control" onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{ fontSize: "20px" }}>Email</label>
                                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{ fontSize: "20px" }}>Status</label>
                                <select className="form-control" onChange={(e) => setStatus(e.target.value)} value={status}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{ fontSize: "20px" }}>Courses</label>
                                <div>
                                    {["HTML", "CSS", "BOOTSTRAP", "JS", "REACT JS", "NODE JS"].map(course => (
                                        <div key={course}>
                                            <input
                                                type="checkbox"
                                                value={course}
                                                onChange={handleCourseChange}
                                                checked={courses.includes(course)}
                                            /> {course}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="btn mx-auto d-block btn-dark mt-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Add;