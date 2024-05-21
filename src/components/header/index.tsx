"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import style from "./index.module.scss";

function Index() {
	const pathname = usePathname();

	return (
		<header className={style.header}>
			<div className="w1200">
				<a href="/" className={style.logo}>
					<img src="https://cdn-js.zzjiasuqi.com/html/home/logo.png" alt="" />
				</a>
				<div className={style.list}>
					<nav className={style.navLink}>
						<div
							className={`${style.item} ${pathname === "/" ? "active" : ""}`}
						>
							<Link href="/">首页</Link>
						</div>
						<div className={style.item}>
							<Link
								href="/help"
								className={`${style.item} ${
									pathname.indexOf("/help") > -1 ? "active" : ""
								}`}
							>
								帮助中心
							</Link>
						</div>
						{/* <div className={style.item}>
							<a href="/help">帮助中心</a>
						</div>
						<div className={style.item}>
							<a target="_blank" href="https://support.qq.com/product/477533">
								提交反馈
							</a>
						</div> */}
					</nav>
					<div className={style.download} data-sctype="top"></div>
				</div>
			</div>
		</header>
	);
}

export default Index;
