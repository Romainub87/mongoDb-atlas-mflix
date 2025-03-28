import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from "next/navigation";

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', { redirect: false, username, password });

            if (result?.error) {
                setError('Sign in failed: ' + result.error);
            } else {
                router.push('/');
            }
        } catch (err: any) {
            setError('An error occurred during sign in');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-black">Connexion</h2>
                {error && <p className="text-red-500 text-sm italic mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Nom d'utilisateur:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Mot de passe:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Se connecter
                        </button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        <a href="/register" className="text-blue-500 hover:text-blue-700">
                            Vous n'avez pas de compte? S'inscrire
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
