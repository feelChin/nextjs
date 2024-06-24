import Http from "@util/fetch";
import { RenderItem, inter_item } from "./index";

async function Index() {
	const { data } = (await Http(
		`http://localhost:9091/[locale]/api/articleList?hot=1`,
		{
			method: "get",
		}
	)) as { data: inter_item[] };

	return <RenderItem data={data} />;
}

export default Index;
