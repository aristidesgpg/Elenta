// Fetch list of tags first
import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import {GET_ALL_TAGS, GET_LEARNER_PROFILE, UPDATE_PROGRAM_MODULE_SEND} from "../../graphql/queries";
import {useEffect, useState} from "react";
import LoadingContainer from "../hoc/LoadingContainer/LoadingContainer";
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export const Tags = (props) => {
  const {loading: queryLoading, error: queryError, data: queryData} = useQuery(GET_ALL_TAGS);
  const [tagOptions, setTagOptions] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  if (!queryLoading && isFirstLoad) {
    setIsFirstLoad(false)
    setTagOptions(queryData.tags.map((tag) =>  {
      return {
        "id": tag.id,
        "label": tag.name
      }
    }));
    console.log(queryData.tags)
  }

  const handleOnChange = (data) => {
    // change the state to include the chosen tag
    // pass the state back up to parent component
    const tempState = [
      ...data
    ];
    props.setTags(tempState);
    console.log("changing")
  };

  return (
    <LoadingContainer loading={[queryLoading]} error={[queryError]}>
      <Typeahead
        multiple={true}
        onChange={handleOnChange}
        options={tagOptions}
      />

    </LoadingContainer>
  )
};

export default Tags;
