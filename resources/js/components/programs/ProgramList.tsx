import * as React from "react";
import ProgramCard from "./ProgramCard";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";

export const ProgramList = ({programs, showCreate}) => {
  return (
    <CardDeck>
      {
        programs.map(p => {
          return (
            <ProgramCard
              key={p.id}
              program={p}
            />
          );
        })
      }
      {
        showCreate &&
        <Card>
          <Card.Body>
            <Link to="/program/settings/new">Create New Program</Link>
          </Card.Body>
        </Card>
      }
    </CardDeck>
  );
};

export default ProgramList;
