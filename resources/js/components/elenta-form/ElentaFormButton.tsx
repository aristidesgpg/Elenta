import * as React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export const ElentaFormButton: React.FunctionComponent<ElentaFormButtonProps> =
  ({
     mutationLoading,
     mutationData,
     mutationError,
     onClick,
     disabled
   }) => {
    return (
      <div>
        <Button type="submit" onClick={onClick} disabled={disabled}>
          {
            mutationLoading ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : "Submit"
          }
        </Button>
        {
          mutationData &&
          <Alert variant="success" transition={null}>Success!</Alert>
        }
        {
          mutationError &&
          <Alert variant='danger' transition={null}>
            {
              mutationError.graphQLErrors.map(e => {
                return <p>{e.message}</p>
              })
            }
          </Alert>
        }
      </div>
    )
  };

interface ElentaFormButtonProps {
  mutationLoading: any,
  mutationError: any,
  mutationData: any,
  onClick?: any,
  disabled?: boolean
}

ElentaFormButton.defaultProps = {
  onClick: () => {
  },
  disabled: false
};

export default ElentaFormButton;
