import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const data = new URLSearchParams(url.search);

	const id = data.get("id");

	try {
		const response = await fetch(
			`https://api-common-client.zzjiasuqi.com/api/v1/article/detail?id=${id}`,
			{
				next: { revalidate: 10 },
			}
		);

		const res = await response.json();

		return NextResponse.json(res);
	} catch (error) {
		return NextResponse.json({ message: error });
	}
}
