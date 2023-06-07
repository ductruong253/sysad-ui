import { getAuthToken } from "../utils/auth";
import { useRouteLoaderData, redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Container, Row } from "react-bootstrap";

function GroupDetail() {
  const group = useRouteLoaderData("groupDetail");
  return (
    <Modal
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Group details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs lg="2">
              ID:{" "}
            </Col>
            <Col>{group.id}</Col>
          </Row>
          <Row>
            <Col xs lg="2">
              Name:{" "}
            </Col>
            <Col>{group.groupName}</Col>
          </Row>
          <Row>
            <Col xs lg="2">
              Description:{" "}
            </Col>
            <Col>{group.groupDescription}</Col>
          </Row>
          <Row>
            <Col xs lg="2">
              Phone:{" "}
            </Col>
            <Col>{group.phoneNum}</Col>
          </Row>
          <Row>
            <Col xs lg="2">
              Address:{" "}
            </Col>
            <Col>{group.address}</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" href={"./" + group.id + "/edit"}>
          Edit
        </Button>
        <Button variant="secondary" href="/groups">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GroupDetail;

export async function groupDetailLoader({ params }) {
  const id = params.groupId;
  const token = getAuthToken();
  const response = await fetch(
    "http://localhost:8081/customer-groups/id/" + id,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const resData = await response.json();
  return resData.group;
}
