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
      icon: "font",
      label: "Rich text",
      jsonSchema: {
        type: "string", 
        title: "Edit me",
        textValue:"\"<p>Text</p>\"",
        default: "Rich Text"
      },
      uiSchema: {
        "ui:options":{
          label:false
        },
        "ui:widget":"RichText",
        editSchema: {                                  
          type: "object",                
          properties: {       
            title: {type: "string", title: "Title"},              
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
      id: "numberinput",
      icon: "sort-numeric-up",
      label: "Number Input",
      jsonSchema: {
        type: "number", 
        title: "Edit me",
        description: "",
        minimum: 0,
        maximum: 100,
        multipleOf: 2,
        default: 0        
      },
      uiSchema: {        
        editSchema: {                                  
          type: "object",                                    
          properties: {                                 
            required: {type: "boolean"},
            minimum:{ type: "number", title:"Minimum", default:0 },
            maximum:{ type: "number", title:"Maximum", default:100 },
            multipleOf:{ type: "number", title:"Step", default: 1 },
          }
        },
        editUISchema:{},
      },
      formData: {}
    },
    {
      id: "slider",
      icon: "text-color",
      label: "Slider",
      jsonSchema: {
        type: "number", 
        title: "Edit me",
        description: "",
        minimum: 0,
        maximum: 100,
        multipleOf: 1,
        //default: [0,1,1,2],
        count:1,
        marks:{number: "ReactNode"}
        //pushable: true        
      },
      uiSchema: {  
        "ui:widget": "Range",      
        editSchema: {                                  
          type: "object",                         
          properties: {                                 
            required: {type: "boolean"},
            minimum:{ type: "number", title:"Minimum", default:0 },
            maximum:{ type: "number", title:"Maximum", default:100 },
            multipleOf:{ type: "number", title:"Step", default: 1 },
          }
        },
        editUISchema:{},
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
        editSchema: {
          type: "object",          
          properties: {            
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
            required: {type: "boolean"},
          },
          editUISchema:{}
        },
      },
      formData: {}
    },
    {
      id: "rank",
      icon: "star",
      label: "Rank",
      jsonSchema: {
        type: "array",
        title: "A Rank Item list",
        description:"",
        items: {
          type: "string",
          enum: ["Item 1", "Item 2", "Item 3"],
        }
      },
      uiSchema: {
        "ui:field": "Rank",
        editSchema: {
          type: "object",          
          properties: {            
            required: {type: "boolean"},
            items: {
              type: "object",
              title: "Rank",
              properties: {
                enum: {
                  title: "",
                  type: "array",
                  items: {
                    type: "string"
                  },
                  default: ["Item 1", "Item 2", "Item3 3"],
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
      id: "multiple-checkbox",
      icon: "check",
      label: "Multiple Choices",
      jsonSchema: {
        type: "array",
        title: "A multiple choices list",
        description:"",
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
      label: "Radio Buttons",
      jsonSchema: {
        type: "string",
        description:"",
        title: "Edit me",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "radio",
        editSchema: {
          type: "object",          
          properties: {            
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
      label: "Dropdown",
      jsonSchema: {
        type: "string",
        format: "string",
        title: "Edit me",
        description:"",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "select",
        editSchema: {
          type: "object",          
          properties: {            
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
        type: "integer",
        format: "date-time",
        title: "Edit me",
        description:""
      },
      uiSchema: {
        "ui:widget": "RDP",
        editSchema: {
          type: "object",          
          properties: {            
            required: {type: "boolean"}
          }
        },
        editUISchema:{}
      },
      formData: {}
    },
    {
      id: "image",
      icon: "font",
      label: "Image",
      jsonSchema: {
        type: "string", 
        imageURL: "",
        title: "Edit me",   
        description:""             
      },
      uiSchema: {        
        "ui:widget":"Image",
        editSchema: {                                  
          type: "object",                                
          properties: {                   
            imageURL:{type: "string", title:"Image URL"}
          }
        },
        editUISchema:{}
      },
      formData: {}
    },
    {
      id: "video",
      icon: "font",
      label: "Video",
      jsonSchema: {
        type: "string", 
        videoURL: "",
        title: "Edit me",   
        description:""             
      },
      uiSchema: {        
        "ui:widget":"Video",
        editSchema: {                                  
          type: "object",                             
          properties: {                   
            videoURL:{type: "string", title:"Video URL"}
          }
        },
        editUISchema:{}
      },
      formData: {}
    },
    {
      id: "repeater",
      icon: "check",
      label: "Repeater",
      jsonSchema: {
        "type":"array",
        title:"new",
        minItems: 0,
        maxItems: 3,
        description:"Description",
         items:{
           type:"object",
           "properties":{},
          }         
      },
      uiSchema: {      
          isRepeater: true,         
          "items":{
            
          },
          editSchema: {                                  
            "type":"object",              
             "properties":{ }       
          },
          editUISchema:{}
      },
      formData: {}
    },
  ],
};
