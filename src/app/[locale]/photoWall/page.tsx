import type { Metadata } from "next";
import Image from "next/image";
import { bannerPool } from "@util/db/roll";
import { inter_locale } from "@type/index";
import { unstable_setRequestLocale } from "next-intl/server";
import style from "./page.module.scss";

export const metadata: Metadata = {
	title: "照片墙",
	keywords: "feelChin",
	description: "feelChin",
};

export default async function Index({ params }: inter_locale) {
	unstable_setRequestLocale(params.locale);

	return (
		<section className="app">
			<div className="w1200">
				{bannerPool.map((item, index) => {
					return (
						<Image
							style={{
								marginBottom: 50,
							}}
							key={index}
							className={style.avatar}
							width={1200}
							height={800}
							src={item}
							alt=""
						/>
					);
				})}
			</div>
		</section>
	);
}
