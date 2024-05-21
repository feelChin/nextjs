import { NextResponse } from "next/server";
import db from "../../../db";

export async function GET(request: Request) {
	const res = await db("select * from brands");

	return NextResponse.json(res);
}
