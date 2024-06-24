import type { Metadata } from "next";
import Image from "next/image";
import { bannerPool } from "@util/db/roll";
import style from "./page.module.scss";

export const metadata: Metadata = {
	title: "照片墙",
	keywords: "feelChin",
	description: "feelChin",
};

export default async function Index() {
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
