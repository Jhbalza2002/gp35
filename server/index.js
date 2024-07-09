const express = require("express");
const app = express();
const {
  client,
  createUserSkill,
  fetchUsers,
  fetchSkills,
  fetchUserSkills,
  deleteUserSkill,
} = require("./db");

app.use(express.json())


app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/skills", async (req, res, next) => {
  try {
    res.send(await fetchSkills());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users/:id/userSkills", async (req, res, next) => {
  try {
    res.send(await fetchUserSkills(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/users/:id/userSkills", async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    res.status(201).send(
      await createUserSkill({
        user_id: req.params.id,
        skill_id: req.body.skill_id,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/users/:userId/userSkills/:id", async (req, res, next) => {
  try {
    await deleteUserSkill({ user_id: req.params.userId, id: req.params.id });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    await client.connect();
    console.log("connected to database");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error during initialization", error);
  }
};
init();
