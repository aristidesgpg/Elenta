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

const GET_TEMPLATE = gql`
    query getTemplate($id: ID!) {
        getTemplate(id: $id) {
            id
            title
            dynamic_fields
            created_at
            modules {
                id
                title
                description
                content
                conditions
                reminders {
                    id
                    type
                    subject
                    message
                    frequency
                    max_reminders
                }
                triggers {
                    id
                    start_timestamp
                    start_timestamp_field
                    frequency
                    max_sends
                }
            }
        }
    }
`

export const TemplateEditor = () => {
    const [activeModule, setActiveModule] = useState();

    let {id} = useParams();
    const {loading, error, data} = useQuery(GET_TEMPLATE, {variables: {id}});

    if (loading) return <Spinner animation="border"/>;
    if (error) return <p>Error :(</p>;

    return (
        <Container fluid="lg">
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

export default TemplateEditor;
