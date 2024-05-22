interface props {
	params: any;
}

interface list {
	id: string;
}

export async function generateStaticParams() {
	const revalidatedData = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
	);

	const { data } = await revalidatedData.json();

	return data.map((post: list) => ({
		slug: String(post.id),
	}));
}

export default async function Page({ params }: props) {
	// const revalidatedData = await fetch(
	// 	`${process.env.__NEXT_PRIVATE_ORIGIN}/api/help?id=${params.slug}`,
	// 	{
	// 		next: { revalidate: 10 },
	// 	}
	// );

	// const { data } = await revalidatedData.json();

	const revalidatedData = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
	);

	const { data } = await revalidatedData.json();

	const post = data.find((item: list) => item.id == params.slug);
	console.log(post);

	return (
		<section style={{ padding: 150 }}>
			<div>{post.article_title}</div>
			<hr />
			<div>{post.create_time}</div>
			<hr />
			<div dangerouslySetInnerHTML={{ __html: post.article_preview }}></div>
		</section>
	);
}
