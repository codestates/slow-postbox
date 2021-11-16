import { MAILSHOW } from "../actions/index"

const mailReducer = (state = { id: null, isChecked: null, isRead: null, received_at: null, title: null, writerName: null }, action) => {
  switch (action.type) {

    case MAILSHOW:
      return {
        ...state,
        id: action.payload.id,
        isChecked: action.payload.isChecked,
        isRead: action.payload.isRead,
        received_at: action.payload.received_at,
        title: action.payload.title,
        writerName: action.payload.writerName,

      };

    default:
      return state;
  }
};

export default mailReducer;
