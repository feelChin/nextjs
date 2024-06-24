import mongoose from "mongoose";

const url = process.env.NEXT_PUBLIC_DBURL as string;

const connectDB = async (name = "webSite") => {
	try {
		await mongoose.connect(url, {
			dbName: name,
		});
	} catch (err: any) {
		throw new Error(err);
	}
};

export default connectDB;
