import * as React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import {Card} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {formatDate} from "../../utils/utils";

// TODO pull styles out in CSS and/or other components
export const ProgramCard = ({program}) => {
  return (
    <Card>
      <Card.Header>{program.title}</Card.Header>
      <Card.Body>
        <Container className="pl-0 pr-0 pb-3">
          <h6 className="text-muted">Format</h6>
          <Card.Subtitle className="text-capitalize">
            {program.format.replace('_', ' ').toLowerCase()}
          </Card.Subtitle>
        </Container>
        <Container className="pl-0 pr-0 pb-3">
          <Row>
            <Col>
              <div className="text-muted">Start Date</div>
              <Card.Text>{formatDate(program.start_timestamp)}</Card.Text>
            </Col>
            <Col>
              <div className="text-muted">End Date</div>
              <Card.Text>{formatDate(program.start_timestamp)}</Card.Text>
            </Col>
            <Col>
              <div className="text-muted">Learners</div>
              <Card.Text>{program.learners.length}</Card.Text>
            </Col>
          </Row>
        </Container>
        <Container className="pl-0 pr-0 pb-3">
          <div className="text-muted">Progress</div>
          <ProgressBar now={60} label={"60%"}/>
        </Container>
      </Card.Body>
      <Card.Footer>
        <Card.Link href={`/program/content/${program.id}`}>Edit</Card.Link>
        <Card.Link>Delete</Card.Link>
      </Card.Footer>
    </Card>
  );
};

export default ProgramCard;
