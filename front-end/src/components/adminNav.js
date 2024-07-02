import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/topNav.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Example() {
    const [val, setvalue] = useState({});
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
        setShow(false);
        setShow2(true);
    };

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    const Signup = async (e) => {
        e.preventDefault();
        try {
            console.log(val);
            const create = await axios.post(`http://localhost:5000/signup/`, val);
            if (create.data) {
                navigate(`/user/${create.data}`);
            } else if (create.data === '') {
                alert("not");
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    const Login = async (e) => {
        e.preventDefault();
        try {
            console.log(val);
            const create = await axios.post(`http://localhost:5000/login/`, val);
            if (create.data) {
                navigate(`/user/${create.data}`);
            } else {
                alert("not");
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    return (
        <>
            <div className="top-nav">
                <div className='top'>
                    <div className='tit' onClick={() => { window.location.href = '/' }}>NEWS Hub</div>
                    <div className='nav-options'>
                        <div className='log-btn' onClick={() => { window.location.href = '/admin/news' }}> All NEWS</div>
                        <div className='log-btn' onClick={() => { window.location.href = '/admin/users' }}>Users</div>
                        <div className='log-btn' onClick={() => { window.location.href = `/admin` }}>Home</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Example;
