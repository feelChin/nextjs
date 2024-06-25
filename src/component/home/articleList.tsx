import Http from "@util/fetch";
import { RenderItem, inter_item } from "./index";

async function Index() {
	const { data } = (await Http(
		`${process.env.NEXT_PUBLIC_BASE_URL}[locale]/api/articleList?hot=1`,
		{
			method: "get",
		}
	)) as { data: inter_item[] };

	return <RenderItem data={data} />;
}

export default Index;
