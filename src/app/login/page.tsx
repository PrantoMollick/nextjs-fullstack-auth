'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

function LoginPage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {};

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-4 text-2xl">Login</h1>
      <hr className="mb-6 w-1/5 bg-gray-200" />
      <form className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="mb-4 rounded-lg border border-gray-300 p-2 text-gray-800 focus:border-gray-600 focus:outline-none"
          type="email"
          id="email"
          value={user.email}
          onChange={e => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="mb-4 rounded-lg border border-gray-300 p-2 text-gray-800 focus:border-gray-600 focus:outline-none"
          type="password"
          id="password"
          value={user.password}
          onChange={e => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />

        <button
          className="mb-4 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none"
          onClick={onLogin}
        >
          Login
        </button>
      </form>
      <Link href="/signup">Visit Signup page!</Link>
    </div>
  );
}

export default LoginPage;
