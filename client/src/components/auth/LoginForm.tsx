import { useState } from 'react';
import { login } from '../../lib/api';
import { useMapStore } from '../../stores/mapStore';
import { useNavigate } from 'react-router-dom';

export function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('vari_token', data.token);        // save token
      useMapStore.setState({ currentUser: data.user });      // update store
      navigate('/map');
    } catch {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontFamily: 'Outfit' }}>Sign in</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
        style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
        style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }} />
      {error && <p style={{ color: 'red', fontSize: 13 }}>{error}</p>}
      <button type="submit">Sign in</button>
      <p>Don't have an account? <button type="button" onClick={onSwitch}>Register</button></p>
    </form>
  );
}