import React from 'react';
import SignatureHelpfulReport from './SignatureHelpfulReport';
import withTracker from './QATrackerHOC';

const AnswerContainer = (props) => {
  const clickHandler = (e) => {
    props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers');
    props.openThumbnail(e);
  };

  return (
    <div className="answer-container">
      <div className="answer" key={props.body} onClick={(e) => { props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}><b className="answer-body">A:</b>&nbsp;<span className="answer-text">{props.body}</span></div>
      <div className="answer-photos">{props.photos.map((photo, i) => {
        return (
          <img src={photo} width="80px" height="60px" key={i} className="answer-photo" onClick={clickHandler} alt={'product photo ' + i}></img>
        );
      })}
      </div>
      <SignatureHelpfulReport aName={props.aName} date={props.date} markHelpful={props.markHelpful} answer_id={props.answer_id} helpfulness={props.helpfulness} report={props.report} />
    </div>
  );
};

export default withTracker(AnswerContainer);