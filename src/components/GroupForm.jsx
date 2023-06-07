import {
  redirect,
  Form as FormWrapper,
  useRouteLoaderData,
} from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import classes from "./GroupForm.module.css";
import { getAuthToken } from "../utils/auth";

function GroupForm() {
  const group = useRouteLoaderData("groupDetail");
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Create new group</Modal.Title>
      </Modal.Header>
      <FormWrapper method="post" className={classes.form}>
        <Row className={classes.row + " mb-3"}>
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="groupName"
              name="groupName"
              defaultValue={group ? group.groupName : ""}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              id="phoneNum"
              name="phoneNum"
              defaultValue={group ? group.phoneNum : ""}
            />
          </Form.Group>
        </Row>
        <Row className={classes.row + " mb-3"}>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              id="address"
              name="address"
              defaultValue={group ? group.address : ""}
            />
          </Form.Group>
        </Row>
        <Row className={classes.row + " mb-3"}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              id="groupDescription"
              name="groupDescription"
              defaultValue={group ? group.groupDescription : ""}
            />
          </Form.Group>
        </Row>
        <Modal.Footer>
          <Button variant="primary" type="submit" className={classes.btn}>
            Submit
          </Button>
          <Button variant="secondary" className={classes.btn}>
            <Link className={classes.link} to="/groups">
              Cancel
            </Link>
          </Button>
        </Modal.Footer>
      </FormWrapper>
    </Modal>
  );
}

export default GroupForm;

export async function createGroup(data) {
  const token = getAuthToken();
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  await fetch("http://localhost:8081/customer-groups", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return redirect("/groups");
}

export async function updateGroup(data) {
  const token = getAuthToken();
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  await fetch("http://localhost:8081/customer-groups", {
    method: "PATCH",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return redirect("/groups");
}
