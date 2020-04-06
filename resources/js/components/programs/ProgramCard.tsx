import * as React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import {Card} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const ProgramCard = ({program}) => {
    return (
        <Card border="dark">
            <Card.Body>
                <Card.Title>{program.title}</Card.Title>
                <Card.Subtitle>{program.format}</Card.Subtitle>
                <Container>
                  <Row>
                    <Col>
                      <strong>Start Date</strong>
                      {program.start_timestamp}
                    </Col>
                    <Col>
                      <strong>End Date</strong>
                      {program.start_timestamp}
                    </Col>
                    <Col>
                      <strong>Learners</strong>
                      34
                    </Col>
                    <Row>
                      <ProgressBar now={60} label={"60%"}/>
                    </Row>
                  </Row>
                </Container>
              <Card.Link href={`/#/program/${program.id}`}>Edit</Card.Link>
              <Card.Link>Delete</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default ProgramCard;
