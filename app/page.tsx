'use client';
import { useSession, signOut } from 'next-auth/react';
import Loader from "@/components/Loader";

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loader />;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
      <>
          <div className="flex justify-between w-1/2 mx-auto mt-10">
              <p className="text-center text-2xl">Welcome, {session.user!.name || 'User'}!</p>
              <button onClick={() => signOut()}>
                  Se déconnecter
              </button>
          </div>
      </>

  );
};

export default Home;