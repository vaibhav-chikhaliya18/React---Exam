import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Component/Header';
import { FaUser, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../Pages/view.css";
import { useNavigate } from 'react-router-dom';

const View = () => {
    const [mdelete, setMdelete] = useState([]);
    const [record, setRecord] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('users')) || [];
        setRecord(data);
    }, []);

    const multipleDelete = (id, checked) => {
        let all = [...mdelete];
        if (checked) {
            all.push(id);
        } else {
            all = all.filter((val) => val !== id);
        }
        setMdelete(all);
    };

    const deleteUser = (id) => {
        let updatedRecord = record.filter((val) => val.id !== id);
        localStorage.setItem('users', JSON.stringify(updatedRecord));
        setRecord(updatedRecord);
        toast.error("User deleted successfully...", {
            autoClose: 1000, 
        });
    };

    const allDelete = () => {
        if (mdelete.length === 0) {
            toast.error("Select at least one row to delete.", {
                autoClose: 1000, 
            });
            return false;
        }
        let updatedRecord = record.filter((val) => !mdelete.includes(val.id));
        localStorage.setItem('users', JSON.stringify(updatedRecord));
        setRecord(updatedRecord);
        toast.error("Selected users deleted successfully...", {
            autoClose: 1000, 
        });
    };

    const statusChange = (status, id) => {
        let updatedRecord = record.map((val) => {
            if (val.id === id) {
                val.status = status === "deactive" ? "active" : "deactive";
            }
            return val;
        });
        localStorage.setItem('users', JSON.stringify(updatedRecord));
        setRecord(updatedRecord);
        toast.success("Status updated successfully...", {
            autoClose: 1000, 
        });
    };

    const toggleMultipleStatus = () => {
        let updatedRecord = record.map((val) => {
            if (mdelete.includes(val.id)) {
                val.status = val.status === "active" ? "deactive" : "active";
            }
            return val;
        });
        localStorage.setItem('users', JSON.stringify(updatedRecord));
        setRecord(updatedRecord);
        toast.success("Status updated for selected users...", {
            autoClose: 1000, 
        });
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <button className="btn btn-success mb-3" onClick={toggleMultipleStatus}>
                            Toggle Status
                        </button>

                        <div className="box">
                            <table className="table">
                                <thead>
                                    <tr align="center" style={{ fontSize: "19px" }}>
                                        <th style={{ fontSize: "22px", width: "10%" }} scope="col"><FaUser /></th>
                                        <th style={{ width: "15%" }} scope="col">Name</th>
                                        <th style={{ width: "15%" }} scope="col">Phone</th>
                                        <th style={{ width: "20%" }} scope="col">Email</th>
                                        <th style={{ width: "10%" }} scope="col">Status</th>
                                        <th style={{ width: "15%" }} scope="col">Courses</th>
                                        <th style={{ width: "10%" }} scope="col">Actions</th>
                                        <th style={{ fontSize: "30px", width: "5%", cursor: "pointer", color: "red" }} scope="col" onClick={allDelete}>
                                            <MdDelete />
                                            
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {record.map((val) => (
                                        <tr key={val.id} align="center" className='align-items-center'>
                                            <td className='pt-4'><FaUser /></td>
                                            <td className='pt-4'>{val.name}</td>
                                            <td className='pt-4'>{val.phone}</td>
                                            <td className='pt-4'>{val.email}</td>
                                            <td className='pt-4'>
                                                <button
                                                    className={`btn btn-${val.status === 'active' ? 'success' : 'danger'}`}
                                                    onClick={() => statusChange(val.status, val.id)}
                                                >
                                                    {val.status}
                                                </button>
                                            </td>

                                            <td className='pt-4'>{val.courses.join(", ")}</td>
                                            <td>
                                                <button className='btn mb-2' style={{ fontSize: "25px", color: "#000", outline: "none", border: "none", display: "inline-block" }} onClick={() => navigate('/edit', { state: val })}>
                                                    <FaEdit />
                                                </button>
                                                ||
                                                <button className='btn mb-2' onClick={() => deleteUser(val.id)} style={{ fontSize: "25px", color: "red", display: "inline-block", outline: "none", border: "none" }}>
                                                    <MdDelete />
                                                </button>
                                            </td>

                                            <td>
                                                <input className='mt-4' type="checkbox" onChange={(e) => multipleDelete(val.id, e.target.checked)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            <ToastContainer
                position="top-left"
                autoClose={1000} 
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
                transition="bounce"
            />
        </div>
    );
};

export default View;