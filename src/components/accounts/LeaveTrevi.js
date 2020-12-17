import React from "react";
import styled from "styled-components";

const StyledLeaveTrevi = styled.div`
  width: 350px;
  .leavetrevi {
    &__title {
      color: #2d2e2c;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 0;
      line-height: 29px;
      text-align: center;
    }
    &__description {
      margin: 30px auto;
      font-size: 18px;
      color: #2d2e2c;
      text-align: center;
    }
    &__buttons {
      display: flex;
      &__yes {
        margin-left: auto;
        margin-right: 20px;
        padding: 12px;
        width: 100px;
        border-radius: 25px;
        border: 0.5px solid transparent !important;
        background: linear-gradient(45deg, #ffffff 0%, #ffffff 100%),
          linear-gradient(15deg, red, blue);
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        color: #141413;
        font-size: 18px;
        font-weight: bold;
        -webkit-letter-spacing: 0;
        -moz-letter-spacing: 0;
        -ms-letter-spacing: 0;
        letter-spacing: 0;
        line-height: 22px;
        text-align: center;
        outline: none;
        -webkit-transition: all ease-out 0.3s;
        transition: all ease-out 0.3s;
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
      &__no {
        margin-right: auto;
        padding: 12px;
        width: 100px;
        border: none;
        border-radius: 25px;
        background: linear-gradient(225deg, #ea04d0 0%, #4f4fc4 100%);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        color: #ffffff;
        font-size: 18px;
        font-weight: bold;
        -webkit-letter-spacing: 0;
        -moz-letter-spacing: 0;
        -ms-letter-spacing: 0;
        letter-spacing: 0;
        line-height: 22px;
        text-align: center;
        outline: none;
        -webkit-transition: all ease-out 0.3s;
        transition: all ease-out 0.3s;
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
    }
  }
`;

const LeaveTrevi = (props) => {
  const { handleLeaveTrevi, toggleModal } = props;

  return (
    <StyledLeaveTrevi>
      <div className="leavetrevi__title">Leave Trevi</div>
      <div className="leavetrevi__description">
        Are you sure you want to leave Trevi? All your accounts will be deleted from our servers and you won’t be able to search them from one place anymore.
      </div>
      <div className="leavetrevi__buttons">
        <div className="leavetrevi__buttons__yes" onClick={handleLeaveTrevi}>
          YES
        </div>
        <div className="leavetrevi__buttons__no" onClick={toggleModal}>
          NO
        </div>
      </div>
    </StyledLeaveTrevi>
  );
};

export default LeaveTrevi;
