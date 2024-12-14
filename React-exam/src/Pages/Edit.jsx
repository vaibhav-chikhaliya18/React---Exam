import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Component/Header';
import { useLocation } from 'react-router-dom';

function Edit() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [courses, setCourses] = useState([]);
    const [record, setRecord] = useState([]);

    let location = useLocation();

    const courseOptions = ["HTML", "CSS", "BOOTSTRAP", "JS", "REACT JS", "NODE JS"];

    useEffect(() => {
        setName(location.state.name);
        setPhone(location.state.phone);
        setEmail(location.state.email);
        setStatus(location.state.status);
        setCourses(location.state.courses || []);
    }, [location]);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('users')) || [];
        setRecord(data);
    }, []);

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        setCourses((prevCourses) => 
            checked ? [...prevCourses, value] : prevCourses.filter((course) => course !== value)
        );
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!name || !phone || !email || !status || courses.length === 0) {
            toast.error("All fields are required");
            return false;
        }

        let updatedRecord = record.map((val) => {
            if (val.id === location.state.id) {
                val.name = name;
                val.phone = phone;
                val.email = email;
                val.status = status;
                val.courses = courses;
            }
            return val;
        });

        localStorage.setItem('users', JSON.stringify(updatedRecord));
        setRecord(updatedRecord);
        toast.success("Successfully updated...");
        setName("");
        setPhone("");
        setEmail("");
        setStatus("");
        setCourses([]);
    };

    return (
        <div>
            <Header />
            <div className="container" style={{ margin: "20px 105px", color: "white" }}>
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <form onSubmit={handleUpdate} className='p-5 shadow border-0 rounded-5'>
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
                                <input type="text" className="form-control" onChange={(e) => setStatus(e.target.value)} value={status} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{ fontSize: "20px" }}>Courses</label>
                                <div>
                                    {courseOptions.map((course) => (
                                        <div key={course}>
                                            <input 
                                                type="checkbox" 
                                                value={course}
                                                checked={courses.includes(course)}
                                                onChange={handleCourseChange} 
                                            />
                                            <label className="ms-2">{course}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="btn mx-auto d-block btn-dark mt-3">Update</button>
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
                transition:Bounce
            />
        </div>
    );
}

export default Edit;