import * as React from "react";
import {
  CURRENT_USER,
  GET_CONSULTANT_PROFILE,
  UPDATE_CONSULTANT_PROFILE,
} from "../graphql/queries";
import {useQuery} from "@apollo/react-hooks";
import {get} from "lodash";
import LoadingContainer from "../components/component-container/LoadingContainer";
import ElentaForm from "../components/elenta-form/ElentaForm";
import {validateEmail} from "../utils/utils";

const validate = ({profile: {mainData: {email}}, passwords: {old_password, password, password_confirmation}}, errors) => {
  if (!validateEmail(email)) {
    errors.profile.mainData.email.addError(`${email} is not a valid email.`);
  }

  if (old_password) {
    if (password !== password_confirmation) {
      errors.passwords.password_confirmation.addError("The passwords confirmation does not match.");
    }
  }

  return errors;
};

const schema = {
  title: "",
  type: "object",
  properties: {
    id: {
      type: "string"
    },

    profile: {
      title: "",
      type: "object",
      properties: {
        mainData: {
          title: "",
          type: "object",
          properties: {
            picture_url: {
              type: "string",
              format: "data-url",
              title: " ",
            },

            title: {
              type: "string",
              title: "Name",
              description: "",
            },

            email: {
              type: "string",
              title: "Email",
              description: "",
            }
          }
        },

        biography: {
          title: "",
          type: "object",
          properties: {
            bio: {
              type: "string",
              title: "Biography",
              description: "",
            },
          }
        }
      },
    },

    passwords: {
      title: "Change Password",
      type: "object",
      properties: {
        old_password: {
          type: "string",
          title: "Enter current password",
          description: "",
          minLength: 6,
          maxLength: 16
        },
        password: {
          type: "string",
          title: "Enter new password",
          description: "",
          minLength: 6,
          maxLength: 16
        },
        password_confirmation: {
          type: "string",
          title: "Confirm Password",
          description: "",
          minLength: 6,
          maxLength: 16
        }
      }
    },
  }
};

const uiSchema = {
  id: {
    "ui:widget": "hidden"
  },
  profile: {
    mainData: {
      title: {
        "ui:placeholder": "Enter your name",
      },
      email: {
        "ui:placeholder": "Enter your email",
        "ui:widget": "email",
        "ui:options": {
          inputType: 'email',
          autoComplete: 'off',
        }
      },
    },
    biography: {
      bio: {
        "ui:widget": "textarea",
        "ui:placeholder": "Enter your biography",
        "ui:options": {
          rows: 10
        }
      }
    }
  },
  passwords: {
    old_password: {
      "ui:placeholder": "Current password",
      "ui:widget": "password"
    },
    password: {
      "ui:placeholder": "Password",
      "ui:widget": "password"
    },
    password_confirmation: {
      "ui:placeholder": "Confirm Password",
      "ui:widget": "password"
    }
  },
};

export const ConsultantProfileSettingsPage = () => {
  const {data: {user}} = useQuery(CURRENT_USER);

  const {loading, error, data} = useQuery(GET_CONSULTANT_PROFILE, {
    variables: {user_id: user.id},
  });

  const consultantProfile = get(data, 'getConsultantProfile', {});

  schema.properties.profile.properties.mainData.properties.picture_url["picture_url"] = consultantProfile.picture_url || null;
  schema.properties.profile.properties.mainData.properties.title["default"] = consultantProfile.title;
  schema.properties.profile.properties.biography.properties.bio["default"] = consultantProfile.bio || "";

  schema.properties.profile.properties.mainData.properties.email["default"] = user.email;

  return <LoadingContainer loading={loading} error={error}>
    <ElentaForm
      schema={schema}
      uiSchema={uiSchema}
      mutation={UPDATE_CONSULTANT_PROFILE}
      mutationVars={
        {
          id: user.id
        }
      }
      mutationTransform={(d) => {
        Object.keys(d).map(section => {
          if (typeof d[section] === "object") {
            Object.keys(d[section]).map(prop => {
              if (typeof d[section][prop] === "object") {
                Object.keys(d[section][prop]).map(pr => {
                  d[pr] = d[section][prop][pr];
                });
              } else {
                d[prop] = d[section][prop];
              }
            });
            delete d[section];
          }
        });
      }}
      validate={validate}
    />
  </LoadingContainer>

  return null;
};

export default ConsultantProfileSettingsPage;
