import * as React from "react";
import LearnerProgramCard from "./LearnerProgramCard";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export const LearnerProgramList = ({programs}) => {
  if (programs && programs.length > 0) {
    return (
      <CardDeck>
        {
          programs.map(p => {
            return (
              <LearnerProgramCard
                key={p.id}
                program={p}
              />
            );
          })
        }
      </CardDeck>
    );
  } else {
    return <Alert variant="info">
      It looks like you aren't enrolled in any Programs yet
      // TODO: Add free, public programs
    </Alert>
  }
};

export default LearnerProgramList;
