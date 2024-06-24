import mongoose from "mongoose";

const schema = new mongoose.Schema({
	detail: {
		type: String,
		required: [true, "请输入文章内容"],
	},
	id: {
		type: Number,
	},
});

const Index =
	mongoose.models.article || mongoose.model("article", schema, "article");

export default Index;
