import mongoose from "mongoose";

const schema = new mongoose.Schema({
	like_id: {
		type: [Number],
		required: [true, "请输入文章id"],
	},
	user_id: {
		type: String,
	},
});

// 会自动更改为复数 如user_infos 第三个参数是重命名
const Index =
	mongoose.models.user_like || mongoose.model("user_like", schema, "user_like");

export default Index;
