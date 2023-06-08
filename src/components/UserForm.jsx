import {
  useLoaderData,
  useRouteLoaderData,
  Form as FormWrapper,
  redirect,
} from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { getAuthToken } from "../utils/auth";
import classes from "./UserForm.module.css";

function UserForm() {
  const groups = useLoaderData();
  const user = useRouteLoaderData("userDetail");
  return (
    <>
      <Modal show={true}>
        <Modal.Header>
          {user ? (
            <Modal.Title>Edit user</Modal.Title>
          ) : (
            <Modal.Title>Create new user</Modal.Title>
          )}
        </Modal.Header>
        <FormWrapper method="post" className={classes.form}>
          <Row className={classes.row + " mb-3"}>
            <Form.Group as={Col}>
              <Form.Label>Full name</Form.Label>
              <Form.Control
                id="fullName"
                name="fullName"
                defaultValue={user ? user.fullName : ""}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                id="email"
                name="email"
                defaultValue={user ? user.email : ""}
              />
            </Form.Group>
          </Row>
          <Row className={classes.row + " mb-3"}>
            <Form.Group className="mb-3">
              <Form.Label>Group</Form.Label>
              <Form.Select
                aria-label="Default select example"
                id="groupId"
                name="groupId"
              >
                <option>Select group...</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id} type="number">
                    {group.id} - {group.code}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Modal.Footer>
            <Button variant="primary" type="submit" className={classes.btn}>
              Submit
            </Button>
            <Button variant="secondary" className={classes.btn}>
              <Link className={classes.link} to="/users">
                Cancel
              </Link>
            </Button>
          </Modal.Footer>
        </FormWrapper>
      </Modal>
    </>
  );
}

export default UserForm;

export async function createUser(data) {
  const token = getAuthToken();
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  postData.password = "12345";
  postData.groupId = parseInt(postData.groupId);
  const response = await fetch("http://localhost:8081/customers", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const resp = await response.json();
  if (!response.ok) {
    alert("Failed to create user: " + resp.message);
    return redirect("/users/newUser");
  } else {
    alert("Success!");
    return redirect("/users");
  }
}

export async function updateUser(data) {
  const token = getAuthToken();
  const id = data.params.id;
  const formData = await data.request.formData();
  const updatedData = Object.fromEntries(formData);
  updatedData.id = parseInt(id);
  const response = await fetch("http://localhost:8081/customers/id/" + id, {
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
  }
  return redirect("/users");
}

export async function userGroupLoader() {
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
