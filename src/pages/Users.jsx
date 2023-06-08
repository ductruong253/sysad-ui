import UsersList from "../components/UsersList";
import { Col, Row, Container, Button } from "react-bootstrap";
import { getAuthToken } from "../utils/auth";
import { Outlet } from "react-router-dom";
import classes from "./Users.module.css";

function UsersPage() {
  return (
    <>
      <Outlet></Outlet>
      <Container fluid="md">
        <Row className={classes.btn_group}>
          <Col className={classes.btn_group}>
            <Button
              variant="primary"
              className={classes.btn}
              href="/users/newUser"
            >
              {/* <Link className={classes.link} to="/groups/newGroup">Create group</Link> */}
              New user
            </Button>
          </Col>
        </Row>
        <Row className={classes.list}>
          <Col>
            <UsersList />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default UsersPage;

export async function usersLoader() {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8081/customers/list/all", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const resData = await response.json();
  return resData.customers;
}
