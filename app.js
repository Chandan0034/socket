// server.js
const express = require('express');
const axios = require('axios');
const cors=require('cors')
const app = express();
app.use(cors())
app.use(express.json())
const port = 8000;

app.get('/' ,(req,res)=>{
    return res.status(200).json({'success':true,'message':"Welcome To Api"})
})

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send('No video URL provided');
  }

  try {
    const response = await axios.get(videoUrl, {
      responseType: 'stream',
    });
    res.setHeader('Content-Disposition', response.headers['content-disposition'] || 'attachment; filename="video.mp4"');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send('Failed to download video');
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
