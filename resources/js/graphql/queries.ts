import {gql} from 'graphql.macro';

export const GET_TEMPLATE = gql`
  query getTemplate($id: ID!) {
    getTemplate(id: $id) {
      id
      title
      can_request
      is_public
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
`;

export const CREATE_TEMPLATE = gql`
  mutation createTemplate($input: CreateTemplateInput!) {
    createTemplate(input: $input) {
      title
      can_request
      is_public
      dynamic_fields
    }
  }
`;

export const UPDATE_TEMPLATE = gql`
  mutation updateTemplate($input: UpdateTemplateInput!) {
    updateTemplate(input: $input) {
      id
      title
      can_request
      is_public
      dynamic_fields
    }
  }
`;
