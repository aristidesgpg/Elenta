import * as React from "react";
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import ModuleList from "../components/modules/ModuleList";

const GET_TEMPLATE = gql`
    query getTemplate {
        getTemplate(id:"1336029c-f4e5-4035-97ac-2bb2c79ed7a1") {
            title
            dynamic_fields
            created_at
            modules {
                title
                description
                content
                conditions
                reminders {
                    type
                    subject
                    message
                    frequency
                    max_reminders
                }
                triggers {
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
    let {id} = useParams();
    const {loading, error, data} = useQuery(GET_TEMPLATE);

    if (loading) return <Spinner animation="border"/>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <ModuleList modules={data.getTemplate.modules}/>
        </div>
    )
};

export default TemplateEditor;
