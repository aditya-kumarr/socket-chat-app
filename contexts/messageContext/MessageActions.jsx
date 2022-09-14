const ACTIONS = {
  ADD_MESSAGE: AddMessage,
};

export function AddMessage(state = [], message) {
  return state.push(message);
}

export default ACTIONS;
