import mongoose from "mongoose";

const schema = new mongoose.Schema({
	p_id: {
		type: Number,
	},
	user_id: {
		type: String,
	},
	content: {
		type: String,
		required: [true, "请输入文章内容"],
	},
	start_time: {
		type: String,
	},
	create_time: {
		type: String,
	},
	like: {
		type: Number,
	},
	count: {
		type: Number,
	},
	has_detail: {
		type: Boolean,
	},
});

const Index =
	mongoose.models.articleList ||
	mongoose.model("articleList", schema, "articleList");

export default Index;
