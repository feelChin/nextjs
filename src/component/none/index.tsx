"use client";

import { useTranslations } from "next-intl";
import style from "./index.module.scss";

function Index() {
	const t = useTranslations("home");

	return (
		<div className={style.none}>
			<i className="iconfont icon-queshao"></i>
			<p>{t("暂无更多信息")}</p>
		</div>
	);
}

export default Index;
