const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/password-storage-app', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
	console.log('Connected to MongoDB!');
});
const Schema = mongoose.Schema;
const userSchema = new Schema(
	{
		username: String,
		password: String,
		data: Array,
	},
	{ collection: 'records' }
);

const userModel = mongoose.model('userSchema', userSchema);
module.exports = {
	userModel,
};
