import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const SignupComponent = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const navigate = useNavigate();

  // const schema = yup.object().shape({
  //   name: yup.string().required().min(2),
  //   email: yup.string().required().email(),
  //   password: yup.string().required().min(7),
  //   role: yup.string().required(),
  //   department: yup.string().required(),
  //   confirmpassword: yup.string().required(),
  // });

  // console.log(schema);

  // const { control, handleSubmit, reset, formState: { errors } } = useForm({
  //   resolver: yupResolver(schema),
  // });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/departments/');
      console.log(response.data.data);
      setDepartments(response.data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post('http://localhost:3001/api/auth/signup', data);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Card>
      <CardHeader className="title_center">
        Sign-Up
      </CardHeader>
      <CardContent>
        <form onSubmit={() => onSubmit({
          name: name,
          email: email,
          password: password,
          role: role,
          department: department,
          confirmpassword: confirmpassword,
        })}>
          <div>
            {/* <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  placeholder="name"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                />
              )}
            /> */}
            <TextField
              type='text'
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            {/* <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  placeholder="email"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            /> */}
            <TextField
              type='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            {/* <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  type="password"
                  placeholder="password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            /> */}
            <TextField
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            {/* <Controller
              name="confirmpassword"
              control={control}
              render={({ field }) => (
                <TextField {...field}
                  type="password"
                  placeholder="confirmpassword"
                  error={!!errors.confirmpassword}
                  helperText={errors.confirmpassword ? errors.confirmpassword.message : ''}
                />
              )}
            /> */}
            <TextField
              type='password'
              placeholder='confirmpassword'
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)} />
          </div>
          <div>
            {/* <FormControl fullWidth error={!!errors.role}>
              <InputLabel id="role-label">What's your role in the organization?</InputLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select {...field} labelId="role-label" label="What's your role in the organization?">
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="faculty">Faculty</MenuItem>
                  </Select>
                )}
              />
              {errors.role && <p>{errors.role.message}</p>}
            </FormControl> */}
            <FormControl fullWidth>
              <InputLabel id="role-label">What's your role in the organization?</InputLabel>
              <Select
                labelId="role-label"
                label="What's your role in the organization?"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="faculty">Faculty</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            {/* <FormControl fullWidth error={!!errors.department}>
              <InputLabel id="department-label">Choose a department</InputLabel>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select {...field} labelId="department-label" label="Choose a department">
                    {departments.map(dept => (
                      <MenuItem key={dept.DeptID} value={dept.DeptID}>
                        {dept.DepartmentName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.department && <p>{errors.department.message}</p>}
            </FormControl> */}
            <FormControl fullWidth>
              <InputLabel id="department-label">Choose a department</InputLabel>
              <Select
                labelId="department-label"
                label="Choose a department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map(dept => (
                  <MenuItem key={dept.DeptID} value={dept.DeptID}>
                    {dept.DepartmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            Already have an account?
            <a href="/login">Login</a>
          </div>

          <div className="button">
            <div>
              <Button type="submit" variant="contained">Sign Up</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupComponent;
