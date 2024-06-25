import { inter_locale } from "@type/index";
import { unstable_setRequestLocale } from "next-intl/server";
import Change from "./index";

export default async function Index({ params }: inter_locale) {
	unstable_setRequestLocale(params.locale);

	return (
		<section className="app">
			<div className="w1200">
				<Change />
			</div>
		</section>
	);
}
