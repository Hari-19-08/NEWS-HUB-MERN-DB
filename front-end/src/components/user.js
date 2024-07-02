import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/topNav.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Example() {
    const [val, setvalue] = useState({
        image: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [base64Image, setBase64Image] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
        setShow(false);
        setShow2(true);
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Image(reader.result);
            setvalue({ ...val, image: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    const AddBooks = async (e) => {
        e.preventDefault();
        try {
            console.log(val);
            const create = await axios.post(`http://localhost:5000/addbooks/${id}`, val);
            if (create.data) {
                window.location.reload();
            } else if (create.data === "done") {
                alert("not");
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    const mybook = () => {
        navigate(`/mybooks/${id}`);
    };

    return (
        <>
            <div className="top-nav">
                <div className="top">
                    <div className="tit" onClick={() => { window.location.href = '/' }} style={{ cursor: 'pointer' }}>NEWS Hub</div>
                    <div className="nav-options">
                        <div onClick={handleShow} className="log-btn">Add NEWS</div>
                        <div onClick={mybook} className="log-btn">My NEWS</div>
                        <div onClick={() => { window.location.href = `/user/${id}` }} className="log-btn">Home</div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add News</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-content">
                        <div className="form-group">
                            <label>Image</label>
                            <input onChange={handleFileInputChange} type='file' className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input name='name' onChange={input} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input name='description' onChange={input} className="form-control" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={AddBooks}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;
