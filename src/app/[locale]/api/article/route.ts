import { NextResponse } from "next/server";
import db from "@util/db";
import { jwt_verify } from "@util/db/jwt";
import ArticleListModel from "@util/db/mongoose/articleList";
import ArticleModel from "@util/db/mongoose/article";
import UserInfoModel from "@util/db/mongoose/user_info";
import dayjs from "dayjs";

export async function GET(req: any) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		await db();

		const data = await ArticleModel.findOne({ id });

		if (data) {
			return NextResponse.json({
				code: 200,
				detail: data.detail,
			});
		}

		return NextResponse.json({
			code: 400,
			data: "没有找到文章",
		});
	} catch (err) {
		return NextResponse.json({
			code: 400,
			msg: String(err),
		});
	}
}

export async function POST(req: Request) {
	const clipText = (str: string, MAX = 50) => {
		if (str.length > MAX) {
			return {
				str: str.substring(0, MAX) + "...",
				change: true,
			};
		}

		return {
			str,
			change: false,
		};
	};

	try {
		const { content, start_time } = await req.json();

		const { user_id } = await jwt_verify(req);

		// 连接数据库
		await db();

		const checkUser = await UserInfoModel.findOne({ _id: user_id });

		if (checkUser) {
			const has_Article = await ArticleModel.find();

			let article_count = has_Article.length + 1;

			await ArticleModel.create({
				detail: content,
				id: article_count,
			});

			const { change, str } = clipText(content);

			await ArticleListModel.create({
				content: str,
				has_detail: change,
				start_time: start_time || "1999-09-09 00:00:00",
				create_time: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
				user_id,
				p_id: article_count,
				count: 0,
				like: 0,
			});

			return NextResponse.json({
				code: 200,
				msg: "发布成功",
			});
		}

		return NextResponse.json({
			code: 400,
			msg: "发布错误",
		});
	} catch (err) {
		return NextResponse.json({
			code: 400,
			msg: String(err),
		});
	}
}
