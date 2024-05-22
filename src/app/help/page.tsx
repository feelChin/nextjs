import Link from "next/link";
import style from "./index.module.scss";

interface article {
	article_type: string;
	article_preview: string;
	article_title: string;
	id: number;
}

async function Index() {
	const revalidatedData = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
	);

	const { data } = await revalidatedData.json();

	return (
		<section className={style.help}>
			<div className="w1200">
				<div className={style.list}>
					{data.map(({ id, article_title }: article, index: number) => {
						return (
							<div key={index} className={style.item}>
								{/* <Link href={`/help/${id}`}>{article_title}</Link> */}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default Index;
