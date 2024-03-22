import React from "react";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";

const TitleActionBar = ({
  Title,
  PlusAction,
  EditAction,
  DeleteAction,
  SaveAction,
  isPlusHidden = false,
  isEditHidden = false,
  isSaveHidden = false,
  isDeleteHidden = false,
  editDisabled = false,
  plustDisabled = false,
  saveDisabled = false,
  deleteDisabled = false,
}) => {
  return (
    <div>
      <Row className="header-container mt-4 mb-3">
        <Col className="tiltle-container">
          <h3 className="header-title">{Title}</h3>
        </Col>
        <Col className="button-container">
          <Button
            className="action-button"
            variant="primary"
            hidden={isPlusHidden}
            disabled={plustDisabled}
            onClick={() => {
              PlusAction();
            }}
          >
            <FontAwesomeIcon icon={faPlus} size="xl" />
          </Button>
          <Button
            className="action-button"
            variant="primary"
            hidden={isEditHidden}
            disabled={editDisabled}
            onClick={() => {
              EditAction();
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} size="xl" />
          </Button>
          <Button
            className="action-button"
            variant="primary"
            hidden={isSaveHidden}
            disabled={saveDisabled}
            onClick={() => {
              SaveAction();
            }}
          >
            <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
          </Button>
          <Button
            className="action-button"
            variant="primary"
            hidden={isDeleteHidden}
            disabled={deleteDisabled}
            onClick={() => {
              DeleteAction();
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} size="xl" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TitleActionBar;
