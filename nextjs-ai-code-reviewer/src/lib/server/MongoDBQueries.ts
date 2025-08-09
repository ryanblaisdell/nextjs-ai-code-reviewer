import { NextResponse } from "next/server";
import clientPromise from "./MongoDB";

const client = await clientPromise;
const db = client.db("code_reviewer");

export async function getUserByEmail(email: string | undefined) {
    if (!email) { return null; }

    try {
        const user = await db.collection('users').findOne({ email });
        return user;
    } catch (error){
        console.log('Failed to find user.', error);
        throw new Error('Database error');
    }
}

export async function createUser(user: {email: string, id: string}) {
    try {
        const result = await db.collection('users').insertOne(user);
        return NextResponse.json({ id: result.insertedId }, { status: 201 });
    } catch(error) {
        console.log('Failed to create user.', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}