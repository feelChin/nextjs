import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import Header from "@component/header";
import { getMessages } from "next-intl/server";
import { RootProvider } from "@util/store";
import NextTopLoader from "nextjs-toploader";
import "../../../public/iconfont/iconfont.css";
import "@style/index.scss";

export const metadata: Metadata = {
	title: "首页",
	keywords: "feelChin",
	description: "feelChin",
};

export default async function RootLayout({
	children,
	params: { locale },
}: Readonly<{
	children: React.ReactNode;
	params: { locale: string };
}>) {
	const messages = await getMessages();

	return (
		<html lang={locale} data-theme="light">
			<body>
				<RootProvider>
					<NextIntlClientProvider messages={messages}>
						<NextTopLoader
							color="#584df0"
							height={2}
							template='<div class="bar" role="bar"><div class="peg"></div></div>'
						/>
						<Header />
						{children}
					</NextIntlClientProvider>
				</RootProvider>
			</body>
		</html>
	);
}
