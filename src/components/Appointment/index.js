import React, { Fragment } from "react";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Delete from './Delete';
import useVisualMode from '..//../hooks/useVisualMode';

import './styles.scss';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const DELETING = "DELETING";

  function onAdd() {
    transition(CREATE);
  }

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(res => transition(SHOW));
  }

  function onDelete() {
    transition(DELETE);
  }

  function onDeleting() {
    transition(DELETING);

    props.cancelInterview(props.id)
    .then(res => transition(EMPTY))
  }

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onBack={back}
          onSave={onSave}
        />
      )}
      {mode === DELETE && (
        <Delete
          message={'Are you sure you want to delete?'}
          onConfirm={onDeleting}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status 
          message={'SAVING'}
        />
      )}
      {mode === DELETING && (
        <Status 
          message={'DELETING'}
        />
      )}
    </article>
  );
}
