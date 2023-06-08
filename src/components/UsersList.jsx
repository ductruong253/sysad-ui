import Table from "react-bootstrap/Table";
import { useLoaderData, Link } from "react-router-dom";
// import classes from "./UsersList.module.css";

function UsersList() {
  const usersList = useLoaderData();
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Full name</th>
          <th>Email</th>
          <th>Group code</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.group.code}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UsersList;
