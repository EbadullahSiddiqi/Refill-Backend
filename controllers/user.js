import User from "../models/user.js";

export async function getAllUsers(req, res) {
  const allUsers = await User.find({});
  const html = `
    <ul>
      ${allUsers.map((user) => `<li>${user.name} - ${user.email}</li>`)}
    </ul>
    `;
  return res.send(html);
}

export async function createNewUser(req, res) {
  if (req.body.name && req.body.email) {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
    });
    console.log(newUser);
    return res.status(201).json({ msg: "success" });
  } else {
    return res.json({ msg: "Information Missing" });
  }
}
