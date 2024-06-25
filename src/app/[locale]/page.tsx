import { getLocale, getTranslations } from "next-intl/server";
import Home from "@component/home";
import Link from "next/link";
import AuthCheck from "@component/authCheck";
import ArticleList from "@component/home/articleList";
import style from "./page.module.scss";

export default async function Index() {
	const t = await getTranslations("home");
	const locale = await getLocale();

	return (
		<section className={"app"}>
			<div className={`w1200 ${style.wrapper}`}>
				<div className={style.head}>
					<p>{t("永远相信美好的明天在等着你")}</p>
					<Link href={`/${locale}/edit`}>
						<AuthCheck>
							<button className="menu">
								{t("我要发布")}
								<i className="iconfont icon-fabusekuai"></i>
							</button>
						</AuthCheck>
					</Link>
				</div>
				<Home>
					<ArticleList />
				</Home>
			</div>
		</section>
	);
}
