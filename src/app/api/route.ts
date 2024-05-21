import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const param = {
			article_type: "帮助中心",
			article_child_type: "加速效果",
			page: 1,
			page_size: 20,
		};

		const data = new URLSearchParams(
			Object.entries(param).map(([key, value]) => [key, String(value)]) as [
				string,
				string
			][]
		).toString();

		const response = await fetch(
			`https://api-common-client.zzjiasuqi.com/api/v1/article/lists?${data}`,
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
