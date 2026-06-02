import react from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('student')
    const [role, setRole] = useState('Advisor')
    const [role, setRole] = useState('Admin')
    const [role, setRole] = useState('SuperAdmin')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { username, email, role, password, confirmPassword })
            if (response.data.success) {
                alert('Signup successful! Please login.')
                navigate('/login')
            } else {
                alert('Signup failed: ' + response.data.message)
            }
        } catch (error) {
            console.error('Signup error:', error)
            alert('An error occurred during signup. Please try again.')
        }
    }

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="Advisor">Advisor</option>
                        <option value="Admin">Admin</option>
                        <option value="SuperAdmin">Super Admin</option>
                    </select>
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default signup