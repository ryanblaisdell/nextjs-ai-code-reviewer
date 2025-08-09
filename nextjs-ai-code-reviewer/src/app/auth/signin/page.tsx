"use client";

import { AuthenticationForm } from './AuthenticationForm';

export default function SignInRoutePage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {/*
        AuthenticationForm is now rendered within the page.tsx file.
        This file handles the URL route.
      */}
      <AuthenticationForm />
    </div>
  );
}