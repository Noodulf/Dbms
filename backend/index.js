const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
// const postsRoutes = require('./routes/posts');
const errorController = require('./controllers/error');
// const cors = require('cors');

const app = express();

const ports = process.env.PORT || 3001;

const mysql = require("mysql");
const db = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "Saumya#237",
  database: "dbmspr",

});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});



app.use('/auth', authRoutes);

// app.use('/post', postsRoutes);
//get departments
app.get("/api/departments/", (req, res) => {
  var sql = "SELECT * FROM departments";
  db.query(sql, function (error, result) {
    console.log(error);
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.get("/api/departments/getName/:deptid", (req, res) => {
  var sql = "SELECT DepartmentName FROM departments WHERE DeptID=" + Number(req.params.deptid);
  db.query(sql, function (error, result) {
    console.log(error);
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.get("/api/users/getUsers/:deptid", (req, res) => {
  var sql = "SELECT * FROM users WHERE role='faculty' and DeptID=" + Number(req.params.deptid);
  db.query(sql, function (error, result) {
    console.log(error);
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.get("/api/users/getUserProfile/:id", (req, res) => {
  var sql = "SELECT * FROM users WHERE ID=" + Number(req.params.id);
  db.query(sql, function (error, result) {
    console.log(error);
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.post("/api/meetings/add", (req, res) => {
  let details = {
    title: req.body.title,
    starttime: req.body.starttime,
    endtime: req.body.endtime,
    scheduled_by: req.body.scheduled_by,
    scheduled_with: req.body.scheduled_with,
    venue: req.body.venue
  };

  console.log(details);

  let sql = "INSERT INTO meetings (title, starttime, endtime, scheduled_by, scheduled_with, venue) VALUES (?, STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.000Z'), STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.000Z'), ?, ?, ?)";

  // Extract values from the details object and create an array
  let values = [
    details.title,
    details.starttime,
    details.endtime,
    details.scheduled_by,
    details.scheduled_with,
    details.venue
  ];

  db.query(sql, values, (error) => {
    console.log(error);
    if (error) {
      res.send({ status: false, message: "Meeting creation failed" });
    } else {
      res.send({ status: true, message: "Meeting created successfully" });
    }
  });
});

app.get("/api/users/getDetails/:useremail", (req, res) => {
  var useremail = req.params.useremail;
  console.log("PRINTINH USERNAME", req.params.useremail);
  var sql = "SELECT * FROM users WHERE email='" + useremail + "'";
  console.log(sql);
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.put("/api/users/update/:useremail", (req, res) => {
  console.log("Begin update");
  const sql = `
  UPDATE users
  SET name = ?, email = ?, password = ?, role = ?, room_no = ?, research = ?, work = ?, education = ?, awards=?
  WHERE email = ?;
`;

  const values = [
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.role,
    req.body.roomno,
    req.body.research,
    req.body.workexperience,
    req.body.education,
    req.body.awards,
    req.body.email // Assuming there is an 'id' field in req.body
  ];

  db.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error updating user:', error);
      // Handle the error appropriately (send an error response, log, etc.)
    } else {
      console.log('User updated successfully');
      // Handle the success (send a success response, redirect, etc.)
    }

  });
});

app.get("/api/users/requests/:useremail", (req, res) => {
  var useremail = req.params.useremail;
  console.log("ABCDE", req.params.useremail);
  var sql = "SELECT * FROM meetings WHERE approved=0 and scheduled_with='" + useremail + "'";
  console.log(sql);
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.get("/api/users/meetings/:useremail", (req, res) => {
  var useremail = req.params.useremail;
  console.log("ABCDE", req.params.useremail);
  var sql = "SELECT * FROM meetings WHERE scheduled_by='" + useremail + "' or scheduled_with='"+ useremail+"'" ;
  console.log(sql);
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.put("/api/meetings/update/approve/:id", (req, res) => {
  console.log("Begin approve");
  const sql = `
  UPDATE meetings
  SET approved = ?
  WHERE mid = ?;
`;

  const values = [
    req.body.approve,
    req.body.meeting_id
  ];

  db.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error approving meeting:', error);
      // Handle the error appropriately (send an error response, log, etc.)
    } else {
      console.log('Meeting approved successfully');
      // Handle the success (send a success response, redirect, etc.)
    }

  });
});

app.delete("/api/meetings/delete/:id", (req, res) => {
  let sql = "DELETE FROM meetings WHERE mid=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Meeting Deleted Failed" });
    } else {
      res.send({ status: true, message: "Meeting Deleted successfully" });
    }
  });
});


app.put('/api/posts/form', (req, res) => {

    // Values to be inserted into the query
    const values = [
      req.body.user,
      req.body.title, 
      req.body.supervisor, 
      req.body.job_type,
      req.body.department,
      req.body.hrs,
      req.body.stipend,
      ];

  console.log("Begin update");
  let sql = `
  INSERT INTO Posts (user, title, supervisor, job_type, department, hrs, stipend) VALUES (?, ?, ?, ?, ?, ?, ?)
`;

  // Execute the query
  db.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error creating a new post in backend', error);
      res.status(500).json({ error: 'Failed to create a post' });
      return;
    }
    console.log('New post created successfully! in backend');
    res.status(200).json({ message: 'Post created successfully' });
  });
});

app.get('/api/opportunities/fetch', (req, res) => {
  // SQL query to retrieve all opportunities from the Opportunities table
  let sql = `SELECT post_id, title, user, supervisor, job_type, department, hrs, stipend, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at  FROM posts`;

  // Execute the query
  db.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error fetching opportunities:', error);
      res.status(500).json({ error: 'Failed to fetch opportunities' });
      return;
    }
    console.log('Opportunities fetched successfully!');
    res.status(200).json(results); // Send the opportunities as a JSON response
  });
});

app.post("/api/saves/add", (req, res) => {
  let details = {
    post_id: req.body.post_id,
    user: req.body.user
  };

  console.log(details);

  let sql = "INSERT INTO saves (post_id, user) VALUES (?, ?)";

  // // Extract values from the details object and create an array
  let values = [
    details.post_id,
    details.user
  ];

  db.query(sql, values, (error) => {
    console.log(error);
    if (error) {
      res.send({ status: false, message: "Post Saved creation failed" });
    } else {
      res.send({ status: true, message: "Post Saved successfully" });
    }
  });
});

app.get("/api/saves/fetch/:useremail", (req, res) => {
  var useremail = req.params.useremail;
  console.log("Saving USERNAME", req.params.useremail);
  var sql = "SELECT p.post_id, p.title, p.supervisor, DATE_FORMAT(DATE_ADD(p.created_at, INTERVAL 10 DAY), '%Y-%m-%d') AS deadline, s.user FROM saves s JOIN posts p on s.post_id=p.post_id WHERE s.user='" + useremail + "'";
  console.log(sql);
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.post("/api/apply/add", (req, res) => {
  let details = {
    post_id: req.body.post_id,
    user: req.body.user
  };

  console.log(details);

  let sql = "INSERT INTO apply (post_id, user) VALUES (?, ?)";

  // // Extract values from the details object and create an array
  let values = [
    details.post_id,
    details.user
  ];

  db.query(sql, values, (error) => {
    console.log(error);
    if (error) {
      res.send({ status: false, message: "Post Saved creation failed" });
    } else {
      res.send({ status: true, message: "Post Saved successfully" });
    }
  });
});

app.post("/api/saves/delete", (req, res) => {
  let details = {
    post_id: req.body.post_id,
    user: req.body.user
  };

  console.log(details);

  let sql = "DELETE FROM saves WHERE post_id = ? AND user = ?";

  // // Extract values from the details object and create an array
  let values = [
    details.post_id,
    details.user
  ];

  db.query(sql, values, (error) => {
    console.log(error);
    if (error) {
      res.send({ status: false, message: "Post Saved creation failed" });
    } else {
      res.send({ status: true, message: "Post Saved successfully" });
    }
  });
});

app.get("/api/apply/fetch/:useremail", (req, res) => {
  var useremail = req.params.useremail;
  console.log("Fetching Applied", req.params.useremail);
  var sql = "SELECT p.title, p.supervisor, p.job_type, a.status, a.user FROM apply a JOIN posts p on a.post_id=p.post_id WHERE a.user='" + useremail + "'";
  console.log(sql);
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.get("/api/application/fetch/:useremail", (req, res) => {
  var useremail = req.params.useremail;
  console.log("Fetching Applications  ", req.params.useremail);
  var sql = "SELECT p.post_id, p.title, a.user, p.department, p.job_type FROM apply a JOIN posts p on a.post_id=p.post_id WHERE p.user='" + useremail + "'";
  console.log(sql);
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.post("/api/application/approve", (req, res) => {
  let details = {
    status: "approved",
    post_id: req.body.post_id,
    user: req.body.user
  };

  console.log(details);

  let sql = "UPDATE apply SET status = ? WHERE post_id = ? AND user = ?";

  // // Extract values from the details object and create an array
  let values = [
    details.status,
    details.post_id,
    details.user
  ];

  db.query(sql, values, (error) => {
    console.log(sql)
    console.log(error);
    if (error) {
      res.send({ status: false, message: "Post Saved creation failed" });
    } else {
      res.send({ status: true, message: "Post Saved successfully" });
    }
  });
});

app.post("/api/application/delete", (req, res) => {
  let details = {
    post_id: req.body.post_id,
    user: req.body.user
  };

  console.log(details);

  let sql = "DELETE FROM apply WHERE post_id = ? AND user = ?";

  // // Extract values from the details object and create an array
  let values = [
    details.post_id,
    details.user
  ];

  db.query(sql, values, (error) => {
    console.log(error);
    if (error) {
      res.send({ status: false, message: "Post Saved creation failed" });
    } else {
      res.send({ status: true, message: "Post Saved successfully" });
    }
  });
});




app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));

