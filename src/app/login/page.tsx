'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [buttonDisable, setButtonDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  const onLogin = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Login success', response.data);
      toast.success('Login Success');
      router.push('/profile');
    } catch (error: any) {
      console.log('login Faiel', error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-4 text-2xl">{isLoading ? 'Processing' : 'Login'}</h1>
      <hr className="mb-6 w-1/5 bg-gray-200" />
      <form className="flex flex-col" onSubmit={onLogin}>
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
          className="mb-4 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none disabled:cursor-not-allowed"
          disabled={buttonDisable}
        >
          Login
        </button>
      </form>
      <Link href="/signup">Visit Signup page!</Link>
    </div>
  );
}

export default LoginPage;
