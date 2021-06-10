import React, { useState } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { ReactComponent as HelpButton } from '../svg/help.svg';
import { ReactComponent as AddButton } from '../svg/plusCol.svg';
import { ReactComponent as RemoveButton } from '../svg/removeCol.svg';

function AnnotationsForm(props) {
  const [note, setNotes] = useState('');

  const addAnnotation = () => {
    if (props.point === undefined || note === '') return;
    let newAnnotations = [...props.annotations];
    newAnnotations.push({
      chartID: props.graph,
      x: props.time[props.row].getTime(),
      y: props.point.y,
      note: note,
    });
    props.setAnnotations(newAnnotations);
  };

  const removeAnnotation = (i) => {
    let newAnnotations = [...props.annotations];
    newAnnotations.splice(i, 1);
    props.setAnnotations(newAnnotations);
  };

  const tooltip = (tip) => {
    return (
      <span className='tooltip'>
        <HelpButton />
        <span className='tooltip-text'>{tip}</span>
      </span>
    );
  };

  const annotation = (i) => (
    <div className='flex'>
      <div className='params'>
        {i === 0 && <label>Graph:</label>}
        {i === props.annotations.length ? (
          <Select
            className='selectGraph'
            placeholder='Choose graph'
            value={{ value: props.graph, label: props.graph }}
            options={[...Array(props.countGraph).keys()].map((_, i) => {
              return { value: i + 1, label: i + 1 };
            })}
            onChange={(selected) => props.setSelectedGraph(selected.value)}
          />
        ) : (
          <p className='chartID'>{props.annotations[i].chartID}</p>
        )}
      </div>
      <div className='params'>
        {i === 0 && <label>X Value:</label>}
        <p>
          {i === props.annotations.length
            ? props.point
              ? moment(new Date(props.point.x)).format('HH:mm:ss')
              : 'undefined'
            : moment(new Date(props.annotations[i].x)).format('HH:mm:ss')}
        </p>
      </div>
      <div className='params'>
        {i === 0 && <label>Y Value:</label>}
        <p>
          {i === props.annotations.length
            ? props.point
              ? props.point.y
              : 'undefined'
            : props.annotations[i].y}
        </p>
      </div>
      <div className='params'>
        {i === 0 && <label>Note:</label>}
        <div className='flex'>
          {i === props.annotations.length ? (
            <input
              type='text'
              className='input-text'
              onChange={(e) => setNotes(e.target.value)}
            />
          ) : (
            <p className='note'>{props.annotations[i].note}</p>
          )}
          {i === props.annotations.length && (
            <AddButton onClick={(e) => addAnnotation()} />
          )}
          {i !== props.annotations.length && (
            <RemoveButton onClick={(e) => removeAnnotation(i)} />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className='annotationsForm form'>
      <h1>Annotations {tooltip('Press Alt+Click to choose point')}</h1>
      {[...Array(props.annotations.length + 1).keys()].map((i) =>
        annotation(i)
      )}
    </div>
  );
}

export default AnnotationsForm;
