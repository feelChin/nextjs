import { NextResponse } from "next/server";
import db from "@util/db";
import mongoose from "mongoose";
import { jwt_verify } from "@util/db/jwt";
import UserLikeModel from "@util/db/mongoose/user_like";
import ArticleListModel from "@util/db/mongoose/articleList";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		const { account } = await jwt_verify(req);

		await db();

		const data = await UserLikeModel.findOne({ account });
		const article = await ArticleListModel.findOne({ p_id: id });

		if (data) {
			return NextResponse.json({
				code: 200,
				count: article.like,
				is_like: data.like_id.includes(id),
			});
		}

		return NextResponse.json({
			code: 200,
			is_like: false,
		});
	} catch (err) {
		return NextResponse.json({
			code: 400,
			msg: String(err),
		});
	}
}

export async function POST(req: Request) {
	try {
		const { id } = await req.json();
		const { user_id } = await jwt_verify(req);

		// 连接数据库
		await db();

		let retries = 3;
		let isLiked: boolean = false;

		while (retries > 0) {
			const session = await mongoose.startSession();
			session.startTransaction();

			isLiked = false;

			try {
				const opts = { session };

				const [data, article] = await Promise.all([
					UserLikeModel.findOne({ user_id }).session(session),
					ArticleListModel.findOne({ p_id: id }).session(session),
				]);

				if (!data) {
					article.like += 1;

					await UserLikeModel.create({
						user_id,
						like_id: [id],
					});

					await article.save();

					await session.commitTransaction();
				} else {
					isLiked = data.like_id.includes(id);

					if (isLiked) {
						const key = data.like_id.findIndex((item: any) => item === id);
						data.like_id.splice(key, 1);
						article.like -= 1;
					} else {
						data.like_id.push(id);
						article.like += 1;
					}

					await Promise.all([data.save(opts), article.save(opts)]);

					await session.commitTransaction();
				}

				break;
			} catch (error: any) {
				await session.abortTransaction();

				if ([251, 112].includes(error.code)) {
					retries--;
				} else {
					throw error;
				}
			} finally {
				session.endSession();
			}
		}

		return NextResponse.json({
			code: 200,
			msg: `${isLiked ? "取消点赞" : "点赞"}成功`,
		});
	} catch (err) {
		return NextResponse.json({
			code: 400,
			msg: String(err),
		});
	}
}
