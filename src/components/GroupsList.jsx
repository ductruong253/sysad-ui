import Table from "react-bootstrap/Table";
import { useLoaderData } from "react-router-dom";
function GroupsList() {
  const groupsList = useLoaderData()
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Group name</th>
          <th>Description</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {groupsList.map((group) => (
          <tr key={group.id}>
            <td>{group.id}</td>
            <td>{group.groupName}</td>
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
