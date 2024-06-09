import User from "./UserModel.js";
import Note from "./NoteModel.js";


// Note.belongsTo(User, { foreignKey: 'user_id' });
// User.hasMany(Note, { foreignKey: 'user_id' });
export { User, Note };