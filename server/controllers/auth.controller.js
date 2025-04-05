const singUp = async (req, res) => {
  res.send("Signup Page");
};

const login = async (req, res) => {
  res.send("Login Page");
};
const logout = async (req, res) => {
  res.send("Logout Page");
};

export { singUp, login, logout };
