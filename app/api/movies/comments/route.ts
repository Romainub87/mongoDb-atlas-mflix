// app/api/movies/comments/route.ts

import { NextResponse } from 'next/server';
import { Db, MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';

/**
 * @swagger
 * /api/movies/comments:
 *   get:
 *     description: Returns comments
 *     responses:
 *       200:
 *         description: Hello Comments
 */
export async function GET(): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const movies = await db.collection('comments').find({}).limit(10).toArray();

        return NextResponse.json(
            { status: 200, data: movies }
        );
    }
    catch (error: any) {
        return NextResponse.json(
            { status: 500, message: 'Internal Server Error', error: error.message }
        );
    }
}

