import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { SButton, SFormControl, SFormTitle, SInput, SLable } from "../styles";
import { ModalContext } from "./ModalContext";

export function FormComponent({
  formArr,
  formTitle,
  buttonName,
  onSubmitAction,
}) {
  const prepareForm = (formArr) => {
    return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
  };
  const initialForm = prepareForm(formArr);

  const [form, setform] = useState(initialForm);
  const { modalDispatch } = useContext(ModalContext);

  const onChangeHandler = (e) =>
    setform((p) => ({ ...p, [e.target.name]: e.target.value }));
  return (
    <SModal
      variants={dropIn}
      initial={dropIn.hidden}
      animate={dropIn.visible}
      exit={dropIn.exit}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitAction(form);
        modalDispatch({ type: "HIDE" });
      }}
    >
      <SFormTitle>{formTitle}</SFormTitle>
      {formArr.map(({ label, name, type }, index) => (
        <SFormControl key={index}>
          <SLable htmlFor={name}>{label}</SLable>
          <SInput
            name={name}
            value={form.name}
            type={type}
            onChange={onChangeHandler}
            required
          />
        </SFormControl>
      ))}
      <SButton>{buttonName}</SButton>
    </SModal>
  );
}
FormComponent.defaultProps = {
  heading: "form Heading",
  formTitle: "form title",
  formArr: [
    {
      label: "Text",
      name: "text",
      type: "text",
    },
  ],
};
export const SModal = styled(motion.form)`
  width: clamp(50%, 700px 90%);
  height: min-content(50%, 300px);

  z-index: 100;
  margin: auto;
  padding: 1rem 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid white; */
`;
export const dropIn = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};
