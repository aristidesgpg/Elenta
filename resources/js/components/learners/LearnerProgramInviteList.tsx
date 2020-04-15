import * as React from "react";
import LearnerProgramCard from "./LearnerProgramCard";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export const LearnerProgramInviteList = ({invites}) => {
  return (
    <CardDeck>
      {
        invites.map(i => {
          return (
            <LearnerProgramCard
              key={i.id}
              program={i.program}
            />
          );
        })
      }
    </CardDeck>
  );
};

export default LearnerProgramInviteList;
