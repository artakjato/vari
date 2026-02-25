import { useState } from 'react';
import { register } from '../../lib/api';
import { useMapStore } from '../../stores/mapStore';
import { useNavigate } from 'react-router-dom';

export function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await register({ email, password, displayName });
      localStorage.setItem('vari_token', data.token);
      useMapStore.setState({ currentUser: data.user });
      navigate('/map');
    } catch {
      setError('Registration failed. Email might already be in use.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontFamily: 'Outfit' }}>Create account</h2>
      <input type="text" placeholder="Display name" value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }} />
      <input type="email" placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }} />
      <input type="password" placeholder="Password (min 6 chars)" value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)' }} />
      {error && <p style={{ color: 'red', fontSize: 13 }}>{error}</p>}
      <button type="submit">Create account</button>
      <p>Already have an account? <button type="button" onClick={onSwitch}>Sign in</button></p>
    </form>
  );
}