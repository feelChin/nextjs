import Link from "next/link";
import { getLocale } from "next-intl/server";
import User from "./user";
import Nav from "./nav";
import Theme from "./theme";
import style from "./index.module.scss";

async function Index() {
	const locale = await getLocale();

	return (
		<header className={style.header}>
			<div className="w1200">
				<section>
					<Link href={`/${locale}`}>
						<div className={style.logo}>MBlog</div>
					</Link>
					<Nav />
				</section>
				<section>
					<User />
					<Theme />
				</section>
			</div>
		</header>
	);
}

export default Index;
