import Table from "react-bootstrap/Table";
import { useLoaderData, Link } from "react-router-dom";
import classes from "./UsersList.module.css";

function UsersList() {
  const usersList = useLoaderData();
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th className={classes.id}>ID</th>
          <th>Full name</th>
          <th>Email</th>
          <th>Group code</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => (
          <tr key={user.id}>
            <td className={classes.id}>{user.id}</td>
            <td>
              <Link to={"/users/" + user.id}>{user.fullName}</Link>
            </td>
            <td>{user.email}</td>
            <td>{user.group.code}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UsersList;
