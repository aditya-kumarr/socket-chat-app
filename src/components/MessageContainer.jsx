import TextBubble from "./TextBubble.style";

export function MessageContainer({ children = [""] }) {
  const populateMessageBox = (message = []) => {
    message.map((message) => (
      <TextBubble author={message.author}>{message.text}</TextBubble>
    ));
  };

  return (
    <div className="card" id="text-container">
      {<TextBubble>{populateMessageBox()}</TextBubble>}
    </div>
  );
}
