interface props {
	params: any;
}

export default async function Page({ params }: props) {
	const revalidatedData = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/help?id=${params.slug}`,
		{
			next: { revalidate: 10 },
		}
	);

	const { data } = await revalidatedData.json();

	return (
		<section style={{ padding: 150 }}>
			<div>{data?.article_title}</div>
			<hr />
			<div>{data?.create_time}</div>
			<hr />
			<div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
		</section>
	);
}
