import mongoose from "mongoose";
import md5 from "@util/db/md5";
import { roll, namePool, avatarPool, bannerPool } from "@util/db/roll";
import dayjs from "dayjs";

const schema = new mongoose.Schema({
	_id: {
		type: mongoose.SchemaTypes.ObjectId,
		auto: true,
	},
	account: {
		type: Number,
		unique: true, //唯一索引
		required: [true, "请输入账号"],
		maxlength: [6, "账号长度不能大于6"],
	},
	password: {
		type: String,
		required: [true, "请输入密码"],
		maxlength: [6, "密码长度不能大于6"],
	},
	name: {
		type: String,
	},
	avatar: {
		type: String,
	},
	banner: {
		type: String,
	},
	create_time: {
		type: String,
	},
});

schema.pre("save", function (next) {
	const { password } = this;
	const pwd = md5(password);

	this.password = pwd;
	this.name = roll(namePool);
	this.avatar = roll(avatarPool);
	this.banner = roll(bannerPool);
	this.create_time = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

	next();
});

// 会自动更改为复数 如user_infos 第三个参数是重命名
const Index =
	mongoose.models.user_info || mongoose.model("user_info", schema, "user_info");

export default Index;
