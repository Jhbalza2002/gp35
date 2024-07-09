const {
    client,
    createTables,
    createUser,
    createSkill,
    createUserSkill,
    fetchUsers,
    fetchSkills,
    deleteUserSkill,
  } = require("./db");

const seed = async () => {
    try {
      await client.connect();
      console.log("connected to database");
      await createTables();
      console.log("tables created");
      const [Bugs, Lucas, Lola, Cooking, Singing, Dancing] = await Promise.all([
        createUser({ username: "Bugs", password: "s3cr3t" }),
        createUser({ username: "Lucas", password: "s3cr3t!!" }),
        createUser({ username: "Lola", password: "s3cr3t123" }),
        createSkill({ name: "Cooking" }),
        createSkill({ name: "Singing" }),
        createSkill({ name: "Dancing" }),
      ]);
      const users = await fetchUsers();
      // console.log(users);
      const skills = await fetchSkills();
      // console.log(skills);
  
      const userSkills = await Promise.all([
        createUserSkill({ user_id: Bugs.id, skill_id: Cooking.id }),
        createUserSkill({ user_id: Bugs.id, skill_id: Singing.id }),
        createUserSkill({ user_id: Lucas.id, skill_id: Singing.id }),
        createUserSkill({ user_id: Lola.id, skill_id: Dancing.id }),
      ]);
      // console.log(await fetchUserSkills(Bugs.id));
      // console.log(userSkills[0]);
      await deleteUserSkill(userSkills[0]);
      // console.log(userSkills);
      // console.log("Bugs skills", await fetchUserSkills(Bugs.id));
  
    } catch (error) {
      console.error("Error during initialization", error);
    }

  };
  seed();