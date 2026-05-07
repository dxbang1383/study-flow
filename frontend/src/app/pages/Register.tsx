import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (email) {
      const emailRegex = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        setError('Invalid email format');
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, nickname, role })
      });
      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.detail || 'Registration failed');
      }
    } catch (err) {
      setError('Server connection error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Role (e.g. Computer Science)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Register</Button>
            <p className="text-center text-sm mt-4">
              Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
