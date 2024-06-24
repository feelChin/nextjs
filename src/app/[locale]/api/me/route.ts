import { NextResponse } from "next/server";
import db from "@util/db";
import UserInfoModel from "@util/db/mongoose/user_info";
import ArticleListModel from "@util/db/mongoose/articleList";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);

		const user_id = String(searchParams.get("user_id"));
		const type = String(searchParams.get("type"));
		const page = Number(searchParams.get("page")) || 1;
		const page_size = Number(searchParams.get("page_size")) || 10;

		if (!user_id) {
			return NextResponse.json({
				code: 400,
				msg: "查不到该用户信息",
			});
		}

		await db();

		const checkUser = await UserInfoModel.findOne({
			_id: user_id,
		});

		if (!checkUser) {
			return NextResponse.json({
				code: 400,
				msg: "查不到该用户信息",
			});
		}

		if (type === "list") {
			const data = await ArticleListModel.find({
				user_id,
			})
				.sort({ _id: -1 })
				.skip(page * 10 - 10)
				.limit(page_size)
				.then((res) => {
					return res.map(({ content, p_id, count, like, create_time }) => {
						return {
							content: content,
							id: p_id,
							count,
							like,
							create_time,
						};
					});
				});

			return NextResponse.json({
				code: 200,
				data,
			});
		}

		const res = await ArticleListModel.find({
			user_id,
		}).then((result) => {
			let count: number = 0;
			let like: number = 0;

			result.forEach((item) => {
				count = count + item.count;
				like = like + item.like;
			});

			return {
				avatar: checkUser.avatar,
				name: checkUser.name,
				banner: checkUser.banner,
				create_time: checkUser.create_time,
				count,
				like,
				total: result.length,
			};
		});

		return NextResponse.json({
			code: 200,
			...res,
		});
	} catch (err) {
		return NextResponse.json({
			code: 400,
			msg: String(err),
		});
	}
}
