import { MAILVIEW } from "../actions/index"

const mailReducer = (state = {
  modalmail: false,
  content: "",
  created_at: "",
  name: "",
  reserved_at: "",
  receiverEmail: "",
  title: "",
  writerEmail: "",
  id: "",
  email: ""
}, action) => {
  switch (action.type) {



    case MAILVIEW:
      return {
        ...state,
        content: action.payload.content,
        created_at: action.payload.created_at,
        name: action.payload.name,
        reserved_at: action.payload.reserved_at,
        receiverEmail: action.payload.receiverEmail,
        title: action.payload.title,
        writerEmail: action.payload.writerEmail,
        id: action.payload.id,
        email: action.payload.email
      };

    default:
      return state;
  }
};

export default mailReducer;
