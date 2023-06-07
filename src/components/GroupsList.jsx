import Table from "react-bootstrap/Table";
import { useLoaderData, Link } from "react-router-dom";
import classes from './GroupsList.module.css'
function GroupsList() {
  const groupsList = useLoaderData();
  return (
    <Table striped bordered hover className={classes.groupsList}>
      <thead>
        <tr>
          <th className={classes.id}>ID</th>
          <th className={classes.name}>Group name</th>
          <th>Description</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {groupsList.map((group) => (
          <tr key={group.id}>
            <td className={classes.id}>{group.id}</td>
            <td className={classes.name}>
              <Link to={"/groups/" + group.id}>{group.groupName}</Link>
            </td>
            <td>{group.groupDescription}</td>
            <td>{group.phoneNum}</td>
            <td>{group.address}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default GroupsList;
