import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/topNav.css';

function Example() {
    const [val, setvalue] = useState({});
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
        setShow(false);
        setShow2(true);
    }

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    const Signup = async (e) => {
        e.preventDefault();
        try {
            const create = await axios.post(`http://localhost:5000/signup/`, val);
            if (create.data !== "exist") {
                navigate(`/user/${create.data}`);
            } else {
                alert("Already Exist");
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    const Login = async (e) => {
        e.preventDefault();
        try {
            const create = await axios.post(`http://localhost:5000/login/`, val);
            if (create.data !== "wrong") {
                navigate(`/user/${create.data}`);
            } else {
                alert("Wrong username or password");
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    return (
        <>
            <div className="top-nav">
                <div className="top">
                    <div className="tit" onClick={() => { window.location.href = '/' }} style={{ cursor: 'pointer' }}>NEWS Hub</div>
                    <div onClick={handleShow} className="log-btn"> Login</div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-content">
                        <div className="form-group">
                            <label>Username</label>
                            <input name='id' onChange={input} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name='password' type="password" onChange={input} className="form-control" />
                        </div>
                    </div>
                    <div className="signup-prompt">Don't have an account? <span onClick={handleShow2} className="signup-link">Sign up</span></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={Login}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-content">
                        <div className="form-group">
                            <label>Name</label>
                            <input name='name' onChange={input} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input name='id' onChange={input} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name='password' type="password" onChange={input} className="form-control" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={Signup}>
                        Signup
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;
