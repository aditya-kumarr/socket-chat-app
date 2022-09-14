import styled from "styled-components";

const TextBubble = styled.div`
  display: flex;
  /* min-height: 0px; */
  flex-wrap: wrap;
  font-size: 0.75rem;
  text-align: left;
  padding: 0.25em 0.5em;
  border-radius: 1.5em;
  line-height: 1.5em;
  color: white;
  transition: all 300ms ease;
  ${({ author }) => {
    switch (author) {
      case "me":
        return `
            align-self: flex-end;
            background-color: rgb(175, 29, 29);
            margin-left: 2em;
            `;
      case "other":
        return `
            align-self:flex-start;
            background-color: rgb(33, 33, 156)
            margin-right:2em;
      `;

      default:
        return ``;
    }
  }}
`;

export default TextBubble;
