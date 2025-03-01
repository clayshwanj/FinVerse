app.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) return res.status(400).json({ message: "Username required" });

  req.session.user = { username }; // Save user data in session
  res.json({ message: "Logged in successfully!" });
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Unauthorized" });

  res.json({ message: `Welcome, ${req.session.user.username}!` });
});
