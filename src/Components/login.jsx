// src/components/Login.jsx
import { useState } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  
} from 'firebase/auth';
import { auth, provider } from '../firebase';
import './Login.css'; // External CSS file

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google login success:', result.user);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const loginWithEmail = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email login success:', result.user);
    } catch (error) {
      console.error('Email login error:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const signupWithEmail = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const fullName = `${firstName} ${lastName}`;
      await updateProfile(result.user, {
        displayName: fullName,
      });
      console.log('Signup success with name:', result.user);
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>SOCIAL SPHERE</h1>
          <p>{isSignUp ? 'Join our community' : 'Connect with your world'}</p>
        </div>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            isSignUp ? signupWithEmail() : loginWithEmail();
          }}
        >
          {isSignUp && (
            <div className="auth-name-grid">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>
          )}

          <div className="auth-input-group">
            <label>Email</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-envelope icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <div className="input-icon-wrapper">
              <i className="fas fa-lock icon" />
              <input
                type="password"
                placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="auth-remember">
              <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="auth-btn main-btn">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          <button type="button" onClick={loginWithGoogle} className="auth-btn google-btn">
            Sign in with Google
          </button>

          <div className="auth-toggle">
            <span>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="toggle-link"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
