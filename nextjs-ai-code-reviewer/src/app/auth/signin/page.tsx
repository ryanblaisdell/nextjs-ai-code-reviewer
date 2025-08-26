"use client";

import { AuthenticationForm } from './AuthenticationForm';

export default function SignInRoutePage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <AuthenticationForm />
    </div>
  );
}