// app/api/theaters/route.ts

import { NextResponse } from 'next/server';
import { Db, MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';

/**
 * @swagger
 * /api/theaters:
 *   get:
 *     description: Returns theaters
 *     responses:
 *       200:
 *         description: Hello Theaters
 */
export async function GET(): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const movies = await db.collection('theaters').find({}).limit(10).toArray();

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

