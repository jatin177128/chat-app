import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: number;
  text: string;
  sender: {
    id: string;
    name: string;
  };
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  currentUser: {
    id: string;
    name: string;
  };
}

const initialState: ChatState = {
  messages: [],
  currentUser: { id: 'user1', name: 'You' },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: state.currentUser,
        timestamp: new Date().toISOString(),
      });
    },
    receiveMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: { id: 'bot', name: 'Bot' },
        timestamp: new Date().toISOString(),
      });
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;

export default chatSlice.reducer;