import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  TextField,
  IconButton,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './App.css';
function App() {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [inputRef.current]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const newQuery = { type: 'query', content: prompt };
    setChatHistory((prev) => [...prev, newQuery]);
    setPrompt('');
    setLoading(true);

     try {
       const response = await fetch(
         //'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDst_ttD22u61RAHnS2wAjIUIKUHtuZ7PM',
         //'https://8091-cs-2cd89a3d-2154-45ea-9f90-2fa02b7963e1.cs-asia-southeast1-seal.cloudshell.dev/salary-plus/chat?prompt='+newQuery.content,
         'https://9091-cs-2cd89a3d-2154-45ea-9f90-2fa02b7963e1.cs-asia-southeast1-seal.cloudshell.dev/salary-plus/chat?prompt='+newQuery.content,
         {
           mode: 'no-cors',
           method: 'GET',

           headers: {
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin':'*',
             'accept': '*/*'
           },
          //  body: JSON.stringify({ prompt: newQuery.content }),
         }
       );

       if (!response.ok) {
         throw new Error('Network response was not ok');
       }

       const data = await response.json();
       const newResponse = { type: 'response', content: data.response || 'No response available.' };
       setChatHistory((prev) => [...prev, newResponse]);
     } catch (error) {
       console.error('Error fetching response:', error);
       const errorResponse = { type: 'response', content: 'Error fetching response.' };
       setChatHistory((prev) => [...prev, errorResponse]);
       return;
     } finally {
       setLoading(false);
     }
    setLoading(false);
    setPrompt('');
    setChatHistory((prev) => [...prev, { type: 'response', content: 'Response from server' }]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Trigger the send action here
      console.log('Enter key pressed, send message!');
      handleSubmit();
      // Add your logic to send the message, e.g., making an API call
    }
  };

  return (
    <Container maxWidth="md" className='main-com'>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'antiquewhite',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            maxWidth: '800px',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#3f51b5' }}
          >
           Salary Plus Gen AI
          </Typography>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              overflow: 'auto',
              maxHeight: '400px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: 2,
              bgcolor: '#fff',
            }}
          >
            {chatHistory.map((chat, index) => (
              <Box
                key={index}
                inputRef={inputRef}
                sx={{
                  alignSelf: chat.type === 'query' ? 'flex-start' : 'flex-end',
                  bgcolor: chat.type === 'query' ? '#e0f7fa' : '#f1f8e9',
                  color: '#000',
                  borderRadius: 2,
                  p: 1,
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }} >
                  {chat.content}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              id="chat-input"
              placeholder="Type your prompt here..."
              multiline
              rows={2}
              value={prompt}
              onChange={handlePromptChange}
              fullWidth
              inputRef={inputRef}
              i//nputProps={{ ref: inputRef }}
              onKeyDown={handleKeyDown}
              variant="outlined"
            />
            <IconButton
              color="primary"
              onClick={handleSubmit}
              disabled={loading || !prompt.trim()}
            >
              {loading ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </Box>
          <Typography
            variant="caption"
            align="right"
            display="block"
            sx={{ mt: 2, color: '#888' }}
          >
            Powered by Gemini 2.0
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
