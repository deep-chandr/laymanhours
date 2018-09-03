const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/test', (req, res) => {
  res.send({ key: 'Hello From addictd' });
});

app.get('/api/toppost', (req, res) => {
  res.send([
    {
        'id': 1,
        'title' : 'Kerala Flood Relief',
        'date' : '20 Oct',
        'time' : '02:00 pm',
        'author' : 'addictd',
        'content' : `Lorem Ipsum is simply dummy text of the printing and typesetting 
        industry. Lorem Ipsum has been the industry standard dummy text
        ever since the 1500s, when an unknown printer took a galley of
        type and scrambled it to make a type specimen book. It has 
        survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. 
        It was popularised in the 1960s with the release of Letraset 
        sheets containing Lorem Ipsum passages, and more recently with 
        desktop publishing software like Aldus PageMaker including 
        versions of Lorem Ipsum.`,
        'imgList' : 'http://images.fanpop.com/images/image_uploads/Bugs-Bunny-warner-brothers-animation-71634_1024_768.jpg'
    },{
        'id': 2,
        'title' : 'Kerala Flood Relief',
        'date' : '20 Oct',
        'time' : '02:00 pm',
        'author' : 'addictd',
        'content' : `Lorem Ipsum is simply dummy text of the printing and typesetting 
        industry. Lorem Ipsum has been the industry standard dummy text
        ever since the 1500s, when an unknown printer took a galley of
        type and scrambled it to make a type specimen book. It has 
        survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. 
        It was popularised in the 1960s with the release of Letraset 
        sheets containing Lorem Ipsum passages, and more recently with 
        desktop publishing software like Aldus PageMaker including 
        versions of Lorem Ipsum.`,
        'imgList' : 'http://images.fanpop.com/images/image_uploads/Bugs-Bunny-warner-brothers-animation-71634_1024_768.jpg'
    }
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));