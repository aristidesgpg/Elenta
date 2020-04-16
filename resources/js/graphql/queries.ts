import {gql} from 'graphql.macro';

//TODO: fragments
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
        pivot {
          id
          folder
          order
        }
        reminders {
          id
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
      requests {
        id
        email
        organization
        comment
      }
    }
  }
`;
/*

      templateModules {
        id
        folder
        order
        module {
          title
          description
          content
          conditions
          reminders {
            id
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
 */

export const GET_TEMPLATES_BY_OWNER = gql`
  query getTemplatesByOwner($consultant_profile_id: ID!) {
    getTemplatesByOwner(consultant_profile_id: $consultant_profile_id) {
      id
      title
      dynamic_fields
    }
  }
`;

export const UPSERT_TEMPLATE = gql`
  mutation updateTemplate($input: UpsertTemplateInput!) {
    upsertTemplate(input: $input) {
      id
      title
      can_request
      is_public
      dynamic_fields
    }
  }
`;

export const SYNC_TEMPLATE_MODULES = gql`
  mutation syncTemplateModules($input: SyncTemplateModulesInput!) {
    syncTemplateModules(input: $input) {
      id
      modules {
        id
        title
        description
        content
        conditions
        pivot {
          id
          folder
          order
        }
        reminders {
          id
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

export const SYNC_PROGRAM_MODULES = gql`
  mutation syncProgramModules($input: SyncProgramModulesInput!) {
    syncProgramModules(input: $input) {
      id
      modules {
        id
        title
        description
        content
        conditions
        pivot {
          id
          folder
          order
        }
        reminders {
          id
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
      template {
        id
        title
      }
      modules {
        id
        title
        description
        content
        conditions

        pivot {
          id
          folder
          order
        }

        reminders {
          id
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
      programModules {
        id
        module {
          id
          title
        }
        sends {
          learner {
            id
          }
          reason
          channel
          subject
          message

          send_timestamp
          open_timestamp
          click_timestamp
          response_timestamp

          response_feedback
          response_rating
          response_data
        }

      }
      learners {
        user {
          id
          name
        }
        id
        picture_url
        role
        tenure
      }
      invites {
        email
        creator {
          id
          name
        }
        learner {
          id
        }
      }
    }
  }
`;

export const UPSERT_PROGRAM = gql`
  mutation upsertProgram($input: UpsertProgramInput!) {
    upsertProgram(input: $input) {
      id
      template {
        id
        title
      }
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

export const CREATE_PROGRAM_INVITES = gql`
  mutation createProgramInvites($input: [CreateProgramInviteInput]!) {
    createProgramInvites(input: $input) {
      id
      email
      created_at
    }
  }
`;

export const UPSERT_MODULE = gql`
  mutation upsertModule($input: UpsertModuleInput!) {
    upsertModule(input: $input) {
      id
      title
      description
      content
      conditions
      templates {
        id
        pivot {
          id
          folder
          order
        }
      }
      reminders {
        id
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
`;

export const GET_USER = gql`
  query getUser($id : ID!) {
    getUser(id: $id) {
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

export const GET_ME = gql`
  query me {
    me {
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


export const GET_LEARNER_PROFILE = gql`
  query getLearnerProfile($user_id : ID!) {
    getLearnerProfile(user_id: $user_id) {
      id
      picture_url
      role
      tenure
      programInvites {
        id
        program {
          id
          title
          description
          start_timestamp
        }
      }
      programs {
        id
        title
        format
        max_learners
        start_timestamp
        can_invite
        is_public
        programModules {
          id
          module {
            id
            title
          }
          sends {
            id
            response_timestamp
            response_data
          }
        }
      }
    }
  }
`;

export const GET_CONSULTANT_PROFILE = gql`
  query getConsultantProfile($user_id : ID!) {
    getConsultantProfile(user_id: $user_id) {
      id
      picture_url
      title
      bio
      programs {
        id
        title
        format
        max_learners
        start_timestamp
        can_invite
        is_public
        programModules {
          id
          module {
            id
            title
          }
          sends {
            id
            response_timestamp
          }
        }
        learners {
          id
        }
        invites {
          id
        }
      }
      templates {
        id
        title
        can_request
        is_public
        requests {
          id
        }
        programs {
          id
        }
      }
    }
  }
`;

export const UPDATE_CONSULTANT_PROFILE = gql`
  mutation updateConsultantProfile($input: UpdateConsultantProfileInput!) {
    updateConsultantProfile(input: $input) {
      id
      picture_url
      title
      bio

      programs {
        id
        title
        format
        max_learners
        start_timestamp
        can_invite
        is_public
        programModules {
          id
          module {
            id
            title
          }
          sends {
            id
            response_timestamp
          }
        }
        learners {
          id
        }
        invites {
          id
        }
      }
      templates {
        title
        can_request
        is_public
        requests {
          id
        }
        programs {
          id
        }
      }
    }
  }
`;

//Local apollo state queries

export const CURRENT_USER = gql`
  {
    user @client{
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

export const CURRENT_USER_PROFILE = gql`
  {
    userProfile @client{
      id
      picture_url
      title
      bio
    }
  }
`;
