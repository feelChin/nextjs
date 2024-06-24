import { NextResponse } from "next/server";
import { jwt_sign, jwt_verify } from "@util/db/jwt";
import md5 from "@util/db/md5";
import db from "@util/db";
import UserInfoModel from "@util/db/mongoose/user_info";

export async function GET(req: Request) {
	try {
		const { user_id } = await jwt_verify(req);

		await db();

		const checkUser = await UserInfoModel.findOne({ _id: user_id });

		if (checkUser) {
			const { account, avatar, name, banner, create_time } = checkUser;

			return NextResponse.json({
				code: 200,
				data: {
					id: user_id,
					account,
					avatar,
					name,
					banner,
					create_time,
				},
			});
		}

		return NextResponse.json({
			code: 400,
			msg: "登录已失效，请重新登录",
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
		const param = await req.json();

		const { account } = param;

		await db();

		const checkUser = await UserInfoModel.findOne({ account });

		if (checkUser) {
			return NextResponse.json({
				code: 400,
				msg: "已有账号注册",
			});
		}

		await UserInfoModel.create(param);

		const { _id } = await UserInfoModel.findOne({ account });

		return NextResponse.json({
			code: 200,
			msg: "注册成功",
			token: jwt_sign({ user_id: _id }),
		});
	} catch (err) {
		return NextResponse.json({
			code: 400,
			msg: String(err),
		});
	}
}

export async function PUT(req: Request) {
	try {
		const param = await req.json();

		const { account, password, avatar, name, banner } = param;

		await db();

		if (account && password) {
			const { matchedCount } = await UserInfoModel.updateOne(
				{
					account,
				},
				{
					password: md5(password),
				}
			);

			if (matchedCount) {
				return NextResponse.json({
					code: 200,
					msg: "重置成功,前去登录吧",
				});
			} else {
				return NextResponse.json({
					code: 200,
					msg: "请选择有效用户",
				});
			}
		}

		if (avatar && name && banner) {
			const { user_id } = await jwt_verify(req);

			await UserInfoModel.updateOne(
				{
					_id: user_id,
				},
				{
					avatar,
					name,
					banner,
				}
			);

			return NextResponse.json({
				code: 200,
				msg: "修改成功",
			});
		}

		return NextResponse.json({
			code: 400,
			msg: "参数错误",
		});
	} catch (err) {
		return NextResponse.json({
			code: 400,
			msg: String(err),
		});
	}
}
