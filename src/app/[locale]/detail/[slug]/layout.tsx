import Http from "@util/fetch";
import { NextResponse } from "next/server";
import db from "@util/db";
import ArticleListModel from "@util/db/mongoose/articleList";
import UserInfoModel from "@util/db/mongoose/user_info";
import { PipelineStage } from "mongoose";
import dayjs from "dayjs";

interface inter_par {
	slug: string;
}

interface inter_props {
	params: inter_par;
}

export async function generateMetadata({ params }: inter_props) {
	return {
		title: params.slug,
	};
}

export async function generateStaticParams() {
	const { data } = (await Http(
		`${process.env.NEXT_PUBLIC_BASE_URL}[locale]/api/articleList?type=all`,
		{
			method: "get",
		}
	)) as { data: any };
	// await db();

	// const data = await ArticleListModel.find();

	return data.map(({ p_id }: { p_id: number }) => ({
		slug: String(p_id),
	}));
}

export default function Layout({ params, children }: any) {
	return children;
}
