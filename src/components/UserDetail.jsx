import { getAuthToken } from "../utils/auth";
import { useRouteLoaderData } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Container, Row } from "react-bootstrap";

export default function UserDetail() {
  const user = useRouteLoaderData("userDetail");
  return (
    <Modal
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          User details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs lg="2">
              ID:{" "}
            </Col>
            <Col>{user.id}</Col>
          </Row>
          <Row>
            <Col xs lg="2">
              Full name:{" "}
            </Col>
            <Col>{user.fullName}</Col>
          </Row>
          <Row>
            <Col xs lg="2">
              Email :{" "}
            </Col>
            <Col>{user.email}</Col>
          </Row>
          <Row>
            <Col xs lg="2">
              Group code:{" "}
            </Col>
            <Col>{user.group.code}</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" href={"./" + user.id + "/edit"}>
          Edit
        </Button>
        <Button variant="secondary" href="/users">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export async function userDetailLoader({ params }) {
  const id = params.id;
  const token = getAuthToken();
  const response = await fetch("http://localhost:8081/customers/id/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const resData = await response.json();
  console.log(resData.customer);
  return resData.customer;
}
