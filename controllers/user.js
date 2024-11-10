import User from "../models/user.js";

export async function getAllUsers(req, res) {
  const allUsers = await User.find({}); // Gets all the users from th database
  const html = `
    <ul>
      ${allUsers.map((user) => `<li>${user.username} - ${user.email}</li>`)}
    </ul>
    `;
  return res.send(html);
}
