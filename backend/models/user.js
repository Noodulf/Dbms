const db = require('../util/database');

module.exports = class User {
  constructor(name, email, password, role, deptid) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.department=department;
  }

  static find(email) {
    console.log("AAA");
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    console.log("query", user.department)
    return db.execute(
      'INSERT INTO users (name, email, password, role, deptid) VALUES (?, ?, ?, ?,?)',
      [user.name, user.email, user.password, user.role, user.department]
    );
  }
};