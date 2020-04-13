import * as React from "react";
import ProgramCard from "./ProgramCard";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";

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
            <a href="/program/settings/new">Create New Program</a>
          </Card.Body>
        </Card>
      }
    </CardDeck>
  );
};

export default ProgramList;
