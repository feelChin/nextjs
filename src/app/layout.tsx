import type { Metadata } from "next";
import Image from "next/image";
import profilePic from "/public/0.png";
import Header from "../components/header";
import "../styles/index.scss";

export const metadata: Metadata = {
	title: "首页",
	keywords:
		"ZZ，加速器，免费加速器，网游加速器，游戏加速器，加速器下载，推荐加速器，全球加速，steam加速，PUBG加速，APEX加速，wow加速，GTA加速，使命召唤加速，英雄联盟加速，下载加速",
	description:
		"ZZ加速器，团队成员深耕加速服务5年，采用自主研发的加速引擎,全球部署顶级IDC集群和电竞级游戏专线！极致降低数据传输损耗，解决游戏延迟、卡顿、掉线、无法登录等问题，让你玩出真精彩！全球直连加速专线，游戏加速效果行业顶尖，打造Z世代极具性价比的加速产品，支持加速绝地求生、APEX、GTA5、CSGO、WOW、COD、Steam，以及LOL英雄联盟、DNF地下城与勇士、CF穿越火线、等上千款海内外网游及主机游戏。",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
