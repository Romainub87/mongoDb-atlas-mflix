// page/api/movies/[idMovie]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   get:
 *     description: Get a theater by ID
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: The theater ID
 *     responses:
 *       200:
 *         description: Theater found
 *       400:
 *         description: Invalid theater ID
 *       404:
 *         description: Theater not found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(request: Request, { params }: { params: { idTheater: string } }): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');

        const { idTheater } = params;
        if (!ObjectId.isValid(idTheater)) {
            return NextResponse.json({ status: 400, message: 'Invalid theater ID', error: 'ID format is incorrect' });
        }

        const theater = await db.collection('theaters').findOne({ _id: new ObjectId(idTheater) });

        if (!theater) {
            return NextResponse.json({ status: 404, message: 'Theater not found', error: 'No movie found with the given ID' });
        }

        return NextResponse.json({ status: 200, data: { theater } });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   post:
 *     description: Create a new theater
 *     responses:
 *       201:
 *         description: Theater created
 *       500:
 *         description: Internal Server Error
 */
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const body = await request.json();
        console.log(body);
        const result = await db.collection('theaters').insertOne(body);

        return NextResponse.json({ status: 201, data: result });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   put:
 *     description: Update a theater by ID
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: The theater ID
 *     responses:
 *       200:
 *         description: Theater updated
 *       400:
 *         description: Invalid theater ID
 *       404:
 *         description: Theater not found
 *       500:
 *         description: Internal Server Error
 */
export async function PUT(request: Request, { params }: { params: { idTheater: string } }): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const { idTheater } = params;
        const body = await request.json();

        if (!ObjectId.isValid(idTheater)) {
            return NextResponse.json({ status: 400, message: 'Invalid theater ID', error: 'ID format is incorrect' });
        }

        const result = await db.collection('theaters').updateOne({ _id: new ObjectId(idTheater) }, { $set: body });

        if (result.matchedCount === 0) {
            return NextResponse.json({ status: 404, message: 'Theater not found', error: 'No theater found with the given ID' });
        }

        return NextResponse.json({ status: 200, data: result });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   delete:
 *     description: Delete a theater by ID
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: The theater ID
 *     responses:
 *       200:
 *         description: Theater deleted
 *       400:
 *         description: Invalid theater ID
 *       404:
 *         description: Theater not found
 *       500:
 *         description: Internal Server Error
 */
export async function DELETE(request: Request, { params }: { params: { idTheater: string } }): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        const { idTheater } = params;

        if (!ObjectId.isValid(idTheater)) {
            return NextResponse.json({ status: 400, message: 'Invalid theater ID', error: 'ID format is incorrect' });
        }

        const result = await db.collection('theaters').deleteOne({ _id: new ObjectId(idTheater) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ status: 404, message: 'Theater not found', error: 'No theater found with the given ID' });
        }

        return NextResponse.json({ status: 200, message: 'Theater deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}