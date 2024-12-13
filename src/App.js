import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    try {

      let dataset = `[
        {
          "id": 1,
          "position": "QNXT Configuration QA/Testing SME",
          "location": "Ghaziabad",
          "gender": "Female",
          "education": "B.Tech/B.E.",
          "experience": 11,
          "salary": 2014510
        },
        {
          "id": 2,
          "position": "Provider Data Management",
          "location": "New Delhi",
          "gender": "Female",
          "education": "B.Tech/B.E.",
          "experience": 24,
          "salary": 1624349
        },
        {
          "id": 3,
          "position": "Accessibility Engineer QA",
          "location": "Noida",
          "gender": "Female",
          "education": "BCA",
          "experience": 25,
          "salary": 1926223
        },
        {
          "id": 4,
          "position": "Senior Software Engineer",
          "location": "Jalandhar",
          "gender": "Male",
          "education": "NA",
          "experience": 27,
          "salary": 2403560
        },
        {
          "id": 5,
          "position": "Java Developer/Spring Boot",
          "location": "Meerut",
          "gender": "Male",
          "education": "B.A",
          "experience": 11,
          "salary": 1128404
        },
        {
          "id": 6,
          "position": "iOS Tester",
          "location": "Padampur",
          "gender": "Female",
          "education": "B.Com",
          "experience": 15,
          "salary": 2090495
        },
        {
          "id": 7,
          "position": "GCP Cloud Architect",
          "location": "New Delhi",
          "gender": "Male",
          "education": "B.Tech/B.E.",
          "experience": 21,
          "salary": 1399850
        },
        {
          "id": 8,
          "position": "Technical Project Manager Remote",
          "location": "Pune",
          "gender": "Male",
          "education": "BCA",
          "experience": 8,
          "salary": 881054
        },
        {
          "id": 9,
          "position": "Provider Data Setup",
          "location": "Kannur",
          "gender": "Female",
          "education": "BCA",
          "experience": 20,
          "salary": 1486474
        },
        {
          "id": 10,
          "position": "iOS Tester",
          "location": "Gurugram",
          "gender": "Female",
          "education": "B.Tech/B.E.",
          "experience": 20,
          "salary": 1981284
        }
      ]
      `;

      let bodyData = `
      {
        "contents": 
        [
            {
                
              "parts": 
              [
                    {
                        "text": "${prompt}"
                    },
                    {
                        "text": "${dataset}"
                    }
                
         ]
        }
       ]
    }`;
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDst_ttD22u61RAHnS2wAjIUIKUHtuZ7PM', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: { bodyData },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data.response); 
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error fetching response.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Salary-Plus
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Enter your prompt"
              multiline
              rows={4}
              value={prompt}
              onChange={handlePromptChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Response"
              multiline
              rows={4}
              value={response}
              disabled 
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;