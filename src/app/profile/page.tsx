'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState(null);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successfully');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="rounded bg-green-500 p-1">
        {!data ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <hr />

      <button
        className="mt-4 rounded bg-blue-500 px-4 py-3 font-bold text-white hover:bg-blue-700"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="mt-4 rounded bg-green-800 px-4 py-3 font-bold text-white hover:bg-blue-700"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}

export default ProfilePage;
