
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { sendMessage, receiveMessage } from '../store/chatSlice';
import { 
  Box, TextField, Button, List, ListItem, ListItemText, 
  Typography, Paper, Container, ThemeProvider, createTheme
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput('');
      // Simulate receiving a message
      setTimeout(() => {
        dispatch(receiveMessage('Thanks for your message!'));
      }, 1000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', py: 2 }}>
        <Paper elevation={3} sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            <List>
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ListItem
                      sx={{
                        justifyContent: message.sender.id === 'user1' ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Paper
                        elevation={2}
                        sx={{
                          maxWidth: '70%',
                          p: 2,
                          bgcolor: message.sender.id === 'user1' ? 'primary.light' : 'secondary.light',
                          borderRadius: 2,
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2" color="textSecondary">
                              {message.sender.name}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography variant="body1" color="textPrimary" gutterBottom>
                                {message.text}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </Typography>
                            </>
                          }
                        />
                      </Paper>
                    </ListItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
            <div ref={messagesEndRef} />
          </Box>
          <Box sx={{ p: 2, bgcolor: 'background.default' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSend}
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                ),
              }}
            />
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Chat;