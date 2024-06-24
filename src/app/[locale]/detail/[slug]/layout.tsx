import Http from "@util/fetch";

interface inter_par {
	slug: string;
}

interface inter_props {
	params: inter_par;
}

export async function generateMetadata({ params }: inter_props) {
	return {
		title: params.slug,
	};
}

export async function generateStaticParams() {
	const { data } = (await Http(
		`http://localhost:9091/[locale]/api/articleList?type=all`,
		{
			method: "get",
		}
	)) as { data: any };

	return data.map(({ p_id }: { p_id: number }) => ({
		slug: String(p_id),
	}));
}

export default function Layout({ params, children }: any) {
	return children;
}
