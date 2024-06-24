import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import Loading from "@component/loading";
import style from "./page.module.scss";

export const metadata: Metadata = {
	title: "发布文章",
	keywords: "feelChin",
	description: "feelChin",
};

const WithCustomLoading = dynamic(() => import("./paper"), {
	loading: () => <Loading />,
	ssr: false,
});

export default async function Index() {
	const t = await getTranslations("edit");

	return (
		<section className="app">
			<div className={`w1200 ${style.editWrapper}`}>
				<h5>{t("发布文章")}</h5>
				<WithCustomLoading />
			</div>
		</section>
	);
}
