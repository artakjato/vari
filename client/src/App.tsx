//import React from 'react'
import './index.css'
import { Button } from "./components/ui/Button";

export default function App() {
  return (
    <div className="p-6 space-x-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}


