import { NextResponse } from "next/server";
import db from "@util/db";
import ArticleListModel from "@util/db/mongoose/articleList";
import UserInfoModel from "@util/db/mongoose/user_info";
import { PipelineStage } from "mongoose";
import dayjs from "dayjs";

interface inter_articel {
	user_id: string;
	p_id: number;
	content: string;
	create_time: string;
	like: number;
	count: number;
	has_detail: boolean;
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);

		const hot = Boolean(searchParams.get("hot")) || false;
		const id = Number(searchParams.get("id")) || 0;
		const type = String(searchParams.get("type")) || "default";
		const page = Number(searchParams.get("page")) || 1;
		const page_size = Number(searchParams.get("page_size")) || 10;

		const renderNewArtucels = (articles: inter_articel[]) => {
			return new Promise(async (resolve) => {
				const userIds = articles.map((item) => item.user_id);

				// 查询所有作者的信息
				const users = await UserInfoModel.find({
					_id: { $in: userIds },
				}).then((res) => {
					const result: any = {};

					res.forEach((item) => {
						const { _id, avatar, name } = item;

						result[_id] = {
							avatar,
							name,
						};
					});

					return result;
				});

				const result = articles.map((item) => {
					const {
						p_id,
						user_id,
						content,
						create_time,
						like,
						count,
						has_detail,
					} = item;

					return {
						p_id,
						user_id,
						content,
						create_time,
						like,
						count,
						has_detail,
						...users[user_id],
					};
				});

				resolve(result);
			});
		};

		await db();

		// 查询热门列表
		if (hot) {
			const articles = await ArticleListModel.find({
				count: {
					$gt: 2,
				},
				like: {
					$gt: 2,
				},
			})
				.sort({ count: -1 })
				.limit(10);

			const data = await renderNewArtucels(articles);

			return NextResponse.json({
				code: 200,
				data,
			});
		}

		// 预渲染 查询全部
		if (type === "all") {
			const data = await ArticleListModel.find();

			return NextResponse.json({
				code: 200,
				data,
			});
		}

		// 根据id查询 其余信息
		if (id) {
			const data = await ArticleListModel.findOne({
				p_id: id,
			});

			const { user_id, count, like, create_time } = data;

			data.count = count + 1;

			await data.save();

			const user = await UserInfoModel.findOne({
				_id: user_id,
			});

			const { avatar, name, banner } = user;

			return NextResponse.json({
				code: 200,
				data: {
					avatar,
					name,
					banner,
					like,
					user_id,
					count: data.count,
					create_time,
				},
			});
		}

		// 查询实时
		const skip = page * 10 - 10;
		const now = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

		const pipeline: PipelineStage[] = [
			{
				$match: {
					start_time: { $lt: now },
				},
			},
			{
				$sort: { _id: -1 },
			},
			{
				$facet: {
					metadata: [{ $count: "total" }],
					data: [{ $skip: skip }, { $limit: page_size }],
				},
			},
		];

		const [item] = await ArticleListModel.aggregate(pipeline);

		// 提取结果并返回给客户端
		const { metadata, data } = item;

		const articles = await renderNewArtucels(data);

		return NextResponse.json({
			code: 200,
			data: articles,
			total: metadata[0].total,
		});
	} catch (err) {
		return NextResponse.json({
			code: 400,
			msg: String(err),
		});
	}
}
