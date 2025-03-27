import {NextRequest, NextResponse} from 'next/server';
import { Db, MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

/**
 * @swagger
 * /api/movies/comments:
 *   get:
 *     summary: Retrieve comments for a specific movie
 *     parameters:
 *       - in: query
 *         name: idMovie
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the movie to retrieve comments for
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       movie_id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       text:
 *                         type: string
 *       400:
 *         description: idMovie parameter is required
 *       500:
 *         description: Internal Server Error
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const idMovie = new ObjectId(searchParams.get('idMovie') || '');

    if (!idMovie) {
        return NextResponse.json(
            { status: 400, message: 'idMovie parameter is required' }
        );
    }

    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const comments = await db.collection('comments').find({ movie_id: idMovie }).toArray();

        return NextResponse.json(
            { status: 200, data: comments }
        );
    }
    catch (error: any) {
        return NextResponse.json(
            { status: 500, message: 'Internal Server Error', error: error.message }
        );
    }
}

