// Fetch list of tags first
import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import {GET_ALL_TAGS, GET_LEARNER_PROFILE, UPDATE_PROGRAM_MODULE_SEND} from "../../graphql/queries";
import {useEffect, useState} from "react";
import LoadingContainer from "../hoc/LoadingContainer/LoadingContainer";
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Form} from "react-bootstrap";

export const Tags = (props) => {
  const {loading: queryLoading, error: queryError, data: queryData} = useQuery(GET_ALL_TAGS);
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([{"id": "1", "label": "Dolor."}]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [loadSelected, setLoadSelected] = useState(false);

  if (!queryLoading && isFirstLoad) {
    setIsFirstLoad(false);
    // setSelectedOptions(props.formData)
    setTagOptions(queryData.tags.map((tag) =>  {
      return {
        "id": tag.id,
        "label": tag.label
      }
    }));
  }

  const handleOnChange = (data) => {
    props.onChange(data);
  };

  return (
    <LoadingContainer loading={[queryLoading]} error={[queryError]}>
      <Form.Label>Tags</Form.Label>
      <Typeahead
        id="tagsForm"
        multiple={true}
        onChange={handleOnChange}
        selected={props.formData}
        options={tagOptions}
        placeholder="Choose some tags"
      />

    </LoadingContainer>
  )
};

export const tagSchema = {
  tags: {
    type: "array",
    title: "Tags",
    items: {
      type: "string"
    }
  }
};

export const tagUiSchema = {
  tags: {
    "ui:field": "tags"
  }
};


export const mutateTagData = (tagsState) => {
  const tags = tagsState === undefined ? [] : {sync: tagsState.map((tag) => {
      return {
        id: tag.id
      }
    })};
  return tags;
};

export default Tags;
