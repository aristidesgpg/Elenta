export default {
  projectName: process.env.PROJECT_NAME || "Formbuilder",
  server: {
    remote: process.env.SERVER_URL,
    bucket: "formbuilder",
  },
  appURL: process.env.APP_URL || window.location.origin + window.location.pathname,
  fieldList: [
    {
      id: "richtext",
      icon: "text-color",
      label: "Rich text",
      jsonSchema: {
        type: "string", 
        textValue:"\"<p>Text</p>\"",
        default: "Text"
      },
      uiSchema: {
        "ui:options":{
          label:true
        },
        "ui:widget":"RichText",
        editSchema: {                                  
          type: "object",                
          properties: {                     
            textValue:{type: "string"}
          }
        },
        editUISchema:{
          "ui:field":"RichEditor"
        }
      },
      formData: {}
    },
    {
      id: "question",
      icon: "text-color",
      label: "Question",
      jsonSchema: {
        type: "object", 
        properties:{
          questionTitle:{type:"string"},
          questionDesc:{type:"string"}
        },
        title: ""
      },
      uiSchema: {
        "ui:options":{
          label:true
        },         
        "ui:field":"Question",
        editSchema: {                                  
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"}
          }
        },
        editUISchema:{           
        }
      },
      formData: {}
    },
    {
      id: "text",
      icon: "text-color",
      label: "Short text",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        description: "",
        default: ""
      },
      uiSchema: {
        /*"ui:options":{
          label:false
        },*/
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Example value"},
            required: {type: "boolean"},
          }
        },
        editUISchema:{}
      },
      formData: {}
    },
    {
      id: "multilinetext",
      icon: "align-left",
      label: "Long text",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        description: "",
        default: ""
      },
      uiSchema: {
        "ui:widget": "textarea",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Example value"},
            required: {type: "boolean"},
          },
          editUISchema:{}
        },
      },
      formData: {}
    },
    {
      id: "checkbox",
      icon: "check",
      label: "Checkbox",
      jsonSchema: {
        type: "boolean",
        title: "Edit me",
        default: false,
      },
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
          }
        },
        editUISchema:{}
      },
      formData: {}
    },
    {
      id: "multiple-checkbox",
      icon: "check",
      label: "Multiple choices",
      jsonSchema: {
        type: "array",
        title: "A multiple choices list",
        items: {
          type: "string",
          enum: ["choice 1", "choice 2", "choice 3"],
        },
        uniqueItems: true,
      },
      uiSchema: {
        "ui:widget": "checkboxes",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            items: {
              type: "object",
              title: "Choices",
              properties: {
                enum: {
                  title: "",
                  type: "array",
                  items: {
                    type: "string"
                  },
                  default: ["choice 1", "choice 2", "choice 3"],
                }
              }
            }
          }
        },
        editUISchema:{}
      },
      formData: {}
    },
    {
      id: "radiobuttonlist",
      icon: "list",
      label: "Choice list",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "radio",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            enum: {
              type: "array",
              title: "Options",
              items: {
                type: "string"
              }
            }
          }
        },
        editUISchema:{}
      },
      formData: {}
    },
    {
      id: "select",
      icon: "chevron-down",
      label: "Select List",
      jsonSchema: {
        type: "string",
        format: "string",
        title: "Edit me",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "select",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            enum: {
              type: "array",
              title: "Options",
              items: {
                type: "string"
              }
            }
          }
        },
        editUISchema:{}
      },
      formData: {}
    },
    {
      id: "date",
      icon: "calendar",
      label: "Date",
      jsonSchema: {
        type: "string",
        format: "date",
        title: "Edit me",
      },
      uiSchema: {
        "ui:widget": "alt-date",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"}
          }
        },
        editUISchema:{}
      },
      formData: {}
    },
  ],
};
