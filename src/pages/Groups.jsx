import GroupsList from "../components/GroupsList";
import GroupForm from "../components/GroupForm";
import { Col, Row, Container, Button } from "react-bootstrap";
import { getAuthToken } from "../utils/auth";
import { useEffect, useState } from "react";
import { Link, Outlet, redirect } from "react-router-dom";
import classes from "./Groups.module.css";

function GroupsPage() {
  return (
    <>
      <Outlet></Outlet>
      <Container fluid="md">
        <Row className={classes.btn_group}>
          <Col className={classes.btn_group}>
            <Button
              variant="primary"
              className={classes.btn}
              href="/groups/newGroup"
            >
              {/* <Link className={classes.link} to="/groups/newGroup">Create group</Link> */}
              Create group
            </Button>
          </Col>
        </Row>
        <Row className={classes.list}>
          <Col>
            <GroupsList />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default GroupsPage;

export async function groupsLoader() {
  const token = getAuthToken();
  const response = await fetch(
    "http://localhost:8081/customer-groups/list/all",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const resData = await response.json();
  return resData.groups;
}
