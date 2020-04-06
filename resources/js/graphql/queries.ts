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

export const GET_TEMPLATES_BY_OWNER = gql`
  query getTemplatesByOwner($consultant_profile_id: ID!) {
    getTemplatesByOwner(consultant_profile_id: $consultant_profile_id) {
      id
      title
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

export const GET_PROGRAM = gql`
  query getProgram($id: ID!) {
    getProgram(id: $id) {
      id
      title
      format
      max_learners
      start_timestamp
      can_invite
      is_public
      dynamic_fields
      dynamic_fields_data
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
      learners {
        id
        picture_url
        role
        tenure
      }
    }
  }
`

export const CREATE_PROGRAM = gql`
  mutation createProgram($input: CreateProgramInput!) {
    createProgram(input: $input) {
      id
      title
      format
      max_learners
      start_timestamp
      can_invite
      is_public
      dynamic_fields
      dynamic_fields_data
    }
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation updateProgram($input: UpdateProgramInput!) {
    updateProgram(input: $input) {
      id
      title
      format
      max_learners
      start_timestamp
      can_invite
      is_public
      dynamic_fields
      dynamic_fields_data
    }
  }
`;

export const GET_ME = gql`
  query me {
    getUser(id: "f99175c5-c3fe-48e5-a622-0b0efb7bdc67") {
      id
      name
      email
      email_verified_at
      learnerProfile {
        id
        picture_url
        role
        tenure
      }
      consultantProfile {
        id
        picture_url
        title
        bio
      }
    }
  }
`;
