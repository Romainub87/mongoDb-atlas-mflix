'use client';
import { useSession, signOut } from 'next-auth/react';
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

const Home = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return <Loader />;
    }

    if (!session) {
        return (
            <div className="flex flex-col items-center mt-10">
                <p className="text-2xl mb-4">Vous n'êtes pas connecté.</p>
                <div className="flex space-x-4">
                    <button
                        onClick={() => router.push('/login')}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                        Se connecter
                    </button>
                    <button
                        onClick={() => router.push('/register')}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        S'inscrire
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <p className="text-2xl mb-4">Welcome, {session.user!.name || 'User'}!</p>
            <div className="flex space-x-4">
                <button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Se déconnecter
                </button>
                <button
                    onClick={() => router.push('/api-doc')}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                >
                    Accéder au Swagger
                </button>
            </div>
        </div>
    );
};

export default Home;