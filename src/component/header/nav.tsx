"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import style from "./index.module.scss";

function Index() {
	const locale = useLocale();
	const pathname = usePathname();

	const t = useTranslations("header");

	const nav = [
		{
			name: t("首页"),
			path: `/${locale}`,
		},
		{
			name: t("照片墙"),
			path: `/${locale}/photoWall`,
		},
	];

	return (
		<nav>
			{nav.map((item, index) => {
				return (
					<div
						key={index}
						className={`${style.item} ${
							pathname == item.path ? style.active : ""
						}`}
					>
						<Link href={item.path}>{item.name}</Link>
					</div>
				);
			})}
		</nav>
	);
}

export default Index;
