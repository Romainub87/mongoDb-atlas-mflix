import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';

/**
 * @swagger
 * /api/movies/comments/{idComment}:
 *   get:
 *     description: Get a comment by ID
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment found
 *       400:
 *         description: Invalid comment ID
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(request: Request, { params }: { params: Promise<{ idComment: string }> }): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');

        const { idComment } = await params;
        if (!ObjectId.isValid(idComment)) {
            return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
        }

        const movie = await db.collection('comments').findOne({ _id: new ObjectId(idComment) });

        if (!movie) {
            return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
        }

        return NextResponse.json({ status: 200, data: { movie } });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

/**
 * @swagger
 * /api/movies/comments/{idComment}:
 *   post:
 *     description: Create a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               text:
 *                 type: string
 *               movieId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       500:
 *         description: Internal Server Error
 */
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const body = await request.json();
        const result = await db.collection('comments').insertOne(body);

        return NextResponse.json({ status: 201, data: result });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

/**
 * @swagger
 * /api/movies/comments/{idComment}:
 *   put:
 *     description: Update a comment by ID
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               text:
 *                 type: string
 *               movieId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *       400:
 *         description: Invalid comment ID
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal Server Error
 */
export async function PUT(request: Request, { params }: { params: Promise<{ idComment: string }> }): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const { idComment } = await params;
        const body = await request.json();

        if (!ObjectId.isValid(idComment)) {
            return NextResponse.json({ status: 400, message: 'Invalid comment ID', error: 'ID format is incorrect' });
        }

        const result = await db.collection('comments').updateOne({ _id: new ObjectId(idComment) }, { $set: body });

        if (result.matchedCount === 0) {
            return NextResponse.json({ status: 404, message: 'Comment not found', error: 'No comment found with the given ID' });
        }

        return NextResponse.json({ status: 200, data: result });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

/**
 * @swagger
 * /api/movies/comments/{idComment}:
 *   delete:
 *     description: Delete a comment by ID
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       400:
 *         description: Invalid comment ID
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal Server Error
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ idComment: string }> }): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const { idComment } = await params;

        if (!ObjectId.isValid(idComment)) {
            return NextResponse.json({ status: 400, message: 'Invalid comment ID', error: 'ID format is incorrect' });
        }

        const result = await db.collection('comments').deleteOne({ _id: new ObjectId(idComment) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ status: 404, message: 'Comment not found', error: 'No comment found with the given ID' });
        }

        return NextResponse.json({ status: 200, message: 'Comment deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}