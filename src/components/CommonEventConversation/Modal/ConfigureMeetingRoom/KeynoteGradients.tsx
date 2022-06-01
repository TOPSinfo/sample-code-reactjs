import React, { Fragment, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { UIButton } from "@theme";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { set, get } from "lodash";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";
import styled from "styled-components";
const KeynotesGradients = () => {
  const dispatch = useDispatch();

  const eventData = useSelector(selectors.getEventComponentData);
  const eventState = useSelector(selectors.getEventState);

  const setColor = useCallback(
    (color: string, index: number) => {
      const clonedState = cloneDeep(eventData);
      try {
        if (color === "") {
          clonedState.keynotes.gradients.splice(index, 1);
        } else {
          clonedState.keynotes.gradients[index] = color;
        }
        dispatch(actions.createEventComponentActions(clonedState));
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, eventData]
  );

  const AddColor = useCallback(() => {
    const clonedState = cloneDeep(eventData);
    try {
      if (!clonedState?.keynotes?.gradients) {
        set(clonedState, "keynotes.gradients", []);
      } else if (!Array.isArray(clonedState.keynotes.gradients)) {
        clonedState.keynotes.gradients = Object.values(
          eventData.keynotes.gradients
        );
      }
      if (clonedState.keynotes.gradients.length === 2) return;
      clonedState.keynotes.gradients.push(
        get(eventState, "theme.buttonColor", "#000000")
      );
      dispatch(actions.createEventComponentActions(clonedState));
    } catch (e) {
      console.error(e);
    }
  }, [eventState, dispatch, eventData]);

  React.useEffect(() => {
    if (!(eventData && eventData.keynotes && eventData.keynotes.gradients)) {
      AddColor();
    }
  }, [eventData, AddColor]);

  return (
    <Fragment>
      {/* <Row>
        <Col
          md={6}
          xl={6}
          lg={6}
          sm={12}
          xs={12}
          className='mb-4 d-flex align-items-center'
        >
          <UICheckbox
            label={"Show color gradient to fill placeholder"}
            name='showKeynoteSection'
            isChecked={get(eventData, "keynotes.hasGradient", false)}
            onChange={(e) =>
              handleFields(e.target.checked, "keynotes.hasGradient", true)
            }
          />
        </Col>
      </Row> */}
      {get(eventData, "keynotes.gradients", []).length === 0 && (
        <ColorInput className='manual-color-input'>
          <Fragment>
            <label className='color-input-label'>
              <span>Show color gradient to fill placeholder</span>
            </label>
            <br />
          </Fragment>
        </ColorInput>
      )}
      {eventData &&
        eventData.keynotes &&
        eventData.keynotes.gradients &&
        (Array.isArray(eventData.keynotes.gradients)
          ? eventData.keynotes.gradients
          : Object.values(eventData.keynotes.gradients)
        ).map((gradient: string, index: number) => (
          <ColorInput className='manual-color-input' key={`keynotes_${index}`}>
            {index === 0 && (
              <Fragment>
                <label className='color-input-label'>
                  <span>Show color gradient to fill placeholder</span>
                </label>
                <br />
              </Fragment>
            )}
            <Row>
              <Col md={11} xl={11} lg={11} sm={12} xs={12} className='mb-4'>
                <div className='wrapper-input-color'>
                  <label className='color-input-label'>
                    <span>Color</span>
                  </label>
                  <ColorDiv
                    className='color-div'
                    style={{
                      backgroundColor: gradient
                    }}
                  >
                    <span className='input-color-placeholder'>Select...</span>
                    <input
                      type='color'
                      className='color-div-input'
                      onChange={(color) => setColor(color.target.value, index)}
                    />
                  </ColorDiv>
                </div>
              </Col>
              <Col md={1} xl={1} lg={1} sm={12} xs={12} className='mt-2 pt-1'>
                <div onClick={() => setColor("", index)}>
                  <Close />
                </div>
              </Col>
            </Row>
          </ColorInput>
        ))}
      {get(eventData, "keynotes.gradients", []).length < 2 && (
        <Row>
          <Col
            md={12}
            xl={12}
            lg={12}
            sm={12}
            xs={12}
            className='mb-4 text-right'
          >
            <UIButton label={"Add More"} border={true} onClick={AddColor} />
          </Col>
        </Row>
      )}
    </Fragment>
  );
};
export default KeynotesGradients;
const ColorDiv = styled.div`
  & .color-div-input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    border: none;
    padding: 0;
    margin: 0;
    box-shadow: none;
    opacity: 0;
  }
  width: 100%;
  position: relative;
  height: 40px;
  border: none;
  & .input-color-placeholder {
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const ColorInput = styled.div`
  & .colored-input {
    padding: 0;
    width: 100%;
    height: 40px;
    border: solid 1px #e9ecef;
  }
  & .color-input-label {
    span {
      font-weight: 500;
    }
    margin-bottom: 0.5rem !important;
    font-size: 14px;
    color: #283747;
  }
  & .transparency-input {
    margin-top: 0px;
    display: flex;
    align-items: center;
  }
  & .wrapper-input-color {
    display: flex;
    align-items: center;
    line-height: 40px;
    & .color-input-label {
      margin-bottom: 0 !important;
      margin-right: 10px;
    }
  }
`;
const Close = () => {
  return (
    <SVG
      version='1.1'
      id='Capa_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='24px'
      height='24px'
      viewBox='0 0 94.926 94.926'
    >
      <g>
        <path
          d='M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
		c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
		c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
		c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
		s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z'
        />
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </SVG>
  );
};
const SVG = styled.svg`
  width: 12px;
  height: 12px;
`;
