import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const client = await clientPromise;
        const db = client.db('cluster0');
        const collection = db.collection('users');

        // Check if the user already exists
        const existingUser = await collection.findOne({ username });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const result = await collection.insertOne({
            username,
            password: hashedPassword,
        });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
    }
}