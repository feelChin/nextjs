export const roll = (pool: string[]) => {
	const key = String(pool.length * Math.random());

	return pool[parseInt(key)];
};

export const namePool: string[] = [
	"闹闹",
	"雨落京都",
	"可爱的微笑",
	"Porter Bessemer",
	"甜甜甜甜甜甜",
	"沛柳酱大魔王",
	"玉萍Sama",
	"俊花丶小可爱",
	"是你的茜茜呀",
];

export const avatarPool: string[] = [
	"/img/avatar/0.jpg",
	"/img/avatar/1.jpg",
	"/img/avatar/2.jpg",
	"/img/avatar/3.jpg",
	"/img/avatar/4.jpg",
	"/img/avatar/5.jpg",
];

export const bannerPool: string[] = [
	"/img/banner/0.jpg",
	"/img/banner/1.jpg",
	"/img/banner/2.jpg",
	"/img/banner/3.jpg",
];
