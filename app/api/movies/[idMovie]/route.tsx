import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   get:
 *     description: Get a movie by ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie found
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(request: Request, context: { params: Promise<{ idMovie: string }> }): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');

        const { idMovie } = await context.params;
        if (!ObjectId.isValid(idMovie)) {
            return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
        }

        const movie = await db.collection('movies').findOne({ _id: new ObjectId(idMovie) });

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
 * /api/movies/{idMovie}:
 *   post:
 *     description: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               plot:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Movie created
 *       500:
 *         description: Internal Server Error
 */
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const body = await request.json();
        const result = await db.collection('movies').insertOne(body);

        return NextResponse.json({ status: 201, data: result });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   put:
 *     description: Update a movie by ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               plot:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Movie updated
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal Server Error
 */
export async function PUT(request: Request, { params }: { params: Promise<{ idMovie: string }> }): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const { idMovie } = await params;
        const body = await request.json();

        if (!ObjectId.isValid(idMovie)) {
            return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
        }

        const result = await db.collection('movies').updateOne({ _id: new ObjectId(idMovie) }, { $set: body });

        if (result.matchedCount === 0) {
            return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
        }

        return NextResponse.json({ status: 200, data: result });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   delete:
 *     description: Delete a movie by ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal Server Error
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ idMovie: string }> }): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const { idMovie } = await params;

        if (!ObjectId.isValid(idMovie)) {
            return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
        }

        const result = await db.collection('movies').deleteOne({ _id: new ObjectId(idMovie) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
        }

        return NextResponse.json({ status: 200, message: 'Movie deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}