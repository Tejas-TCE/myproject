// EditableTable.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { fetchUsers, addUser, updateUser, deleteUser } from "../../slicecomponet/Slice";

const Home = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  // console.log(users);
  

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      dispatch(addUser(newUser));
      setNewUser({ name: "", email: "" }); // Reset the input fields
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
   
    
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      dispatch(updateUser(editingUser));
     
      
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleChange = (e) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Editable User Table</h2>
      
      <div>
        <h3>Add New User</h3>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <Button variant="primary" onClick={handleAddUser}>Add User</Button>
      </div>

      <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              {editingUser?.id === user.id ? (
                <InputGroup>
                  <FormControl
                    type="text"
                    name="name"
                    value={editingUser.name}
                    onChange={handleChange}
                  />
                </InputGroup>
              ) : (
                user.name
              )}
            </td>
            <td>
              {editingUser?.id === user.id ? (
                <InputGroup>
                  <FormControl
                    type="email"
                    name="email"
                    value={editingUser.email}
                    onChange={handleChange}
                    
                  />
                </InputGroup>
              ) : (
                user.email
              )}
            </td>
            <td>
              {editingUser?.id === user.id ? (
                <Button variant="success" onClick={handleSaveEdit}>Save</Button>
              ) : (
                <Button variant="primary" onClick={() => handleEditUser(user)}>Edit</Button>
              )}
              <Button variant="danger" onClick={() => handleDeleteUser(user.id)} className="ml-2">Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default Home;
