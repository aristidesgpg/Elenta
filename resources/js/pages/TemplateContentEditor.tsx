import * as React from "react";
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import ModuleList from "../components/modules/ModuleList";
import {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "../components/builder/Form";
import {GET_TEMPLATE} from "../graphql/queries";

export const TemplateContentEditor = () => {
    const [activeModule, setActiveModule] = useState();

    let {id} = useParams();
    const {loading, error, data} = useQuery(GET_TEMPLATE, {variables: {id}});

    if (loading) return <Spinner animation="border"/>;
    if (error) return <p>Error :(</p>;

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <ModuleList modules={data.getTemplate.modules}
                                activeModule={activeModule}
                                setActiveModule={setActiveModule}/>
                </Col>
                <Col>
                    <Form />
                </Col>
            </Row>
        </Container>
    )
};

export default TemplateContentEditor;
