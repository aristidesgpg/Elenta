import * as React from "react";
import ProgramCard from "./ProgramCard";
import CardDeck from "react-bootstrap/CardDeck";
export const ProgramList = ({programs}) => {
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
        </CardDeck>
    );
};

export default ProgramList;
