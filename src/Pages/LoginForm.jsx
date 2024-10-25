import { useState, useContext } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { auth } from "../firebase"; // Import Firebase auth
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth"; // Import auth functions


export default function Login() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [modalShow, setModalShow] = useState(null);
    
    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext); // Get current user from context

    const handleShowLogin = () => setModalShow("Login");
    const handleShowSignup = () => setModalShow("SignUp");
    const handleClose = () => setModalShow(null);

    const login = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                setError("Email and password are required.");
                return;
            }

            const res = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful:", res.user); // Log successful login

            const payload = { email, uid: res.user.uid }; // Include uid in payload
            console.log("Payload:", payload);

            // You can uncomment this to send the payload to your API
            // const response = await axios.post(`${BASE_URL}/login`, payload);
            // console.log("API response:", response.data);
    
            navigate("/home"); // Navigate to home after successful login
            handleClose(); // Close modal after successful login
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid email or password.");
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid; // Get UID after successful sign-up

            const payload = { email, uid }; // Include uid in payload
            console.log("Sign-up Payload:", payload);
            

            // You can uncomment this to send the payload to your API
            // await axios.post(`${BASE_URL}/signup`, payload);
            navigate("/home"); // Navigate to home after successful signup
            handleClose(); // Close modal after successful signup
        } catch (error) {
            setError("Failed to create an account. Please try again."); // Handle sign-up error
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <div className="row border rounded-5 p-5 bg-white shadow box-area w-100">
                {/* Left Section with Image and Title */}
                <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
                    <div className="featured-img mb-3">
                        <img
                            src="https://image.boxrox.com/2022/05/212302321-1024x682.jpg"
                            className="img-fluid"
                            style={{ width: '100%' }}
                            alt="logo"
                        />
                    </div>
                    <h2 className="text-white bg-dark" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 600 }}>Fitness Thrive</h2>
                    <small className="text-black">©Ruldolf Creation</small>
                </div>

                {/* Right Section - Login Form */}
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="w-100">
                        <h2 className="text-center mb-4 fw-bold">One App For Empower, Healing, Wellbeing, Thrive</h2>
                        <h5 className="text-center mb-4 fw-light">Fitness Thrive gives you world-class access to 5-stars fitness studio, physio-center, and gyms.</h5>
                        <Button variant="primary" onClick={handleShowLogin} className="w-100 mb-2">
                            Login
                        </Button>
                        
                        <Button variant="outline-primary" onClick={handleShowSignup} className="w-100">
                            Create an Account
                        </Button>
                        {error && <p className="text-danger">{error}</p>}
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <Modal show={modalShow === "Login"} onHide={handleClose} centered>
                <Modal.Body>
                    <h2 className="mb-4">Log in to your account</h2>
                    <Form onSubmit={login}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button className="rounded-pill" type="submit">
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Signup Modal */}
            <Modal show={modalShow === "SignUp"} onHide={handleClose} centered>
                <Modal.Body>
                    <h2 className="mb-4">Create your account</h2>
                    <Form onSubmit={handleSignUp}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button className="rounded-pill" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
