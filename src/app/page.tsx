import style from "./page.module.scss";

export default function Home() {
	return (
		<section className={style.home}>
			<div className={`${style.wrapper} w1200`}>
				<div className={style.info}>
					注册即送最高<span>222211小时</span>
				</div>
				<div className={style.title}>Z加速 / Z稳定</div>
				<div className={style.downloadWrapper}>
					<div className={style.download} data-sctype="main">
						下载体验
					</div>
					<p className={style.downloadMessage}></p>
				</div>
			</div>
			<div className={style.gameList}></div>
		</section>
	);
}
