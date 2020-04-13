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
     disabled,
     title,
     className
   }) => {
    return (
      <div className={className}>
        <Button type="submit" onClick={onClick} disabled={disabled} className="w-100">
          {
            mutationLoading ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : title
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
                return <p key={e}>{e.message}</p>
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
  title?: string,
  className?: string
}

ElentaFormButton.defaultProps = {
  onClick: () => {
  },
  disabled: false,
  title: "Submit"
};

export default ElentaFormButton;
