import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import axios from 'axios';
import { __dirname } from '../dir.js';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config({ path: __dirname + '/.env' });

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(__dirname)); // '/' home GET // cannot use this in react, the index.html that needs to be served must come from the static assets (dist) folder
app.use(express.static(__dirname + '/dist')); // static assets

app.post('/api/chat', async (req, res) => {
    
    // const text = req.body;
    // const { text } = 'vegan food shopping list by popularity'
    const { data } = req.body
    console.log('Req.body: ', data);

    const configuration = new Configuration({ apiKey: process.env.OPEN_API_KEY})
    const openai = new OpenAIApi(configuration);

    
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `${data}`}]
        })
        console.log('completion.data.choices[0].message: ', completion.data.choices[0].message.content);
        
        
        const reply = completion.data.choices[0].message.content;
        res.json({ reply })

    } catch(err) {
        console.log(err);
    }
    


    // try {
    //     const response = await axios.post(
    //         'https://api.openai.com/v1/chat/completions',
    //         {
    //             model: 'gpt-3.5-turbo', // gpt-3.5-turbo is most optimized for 'Chat', 1/10th the tokens of Davinci
    //             prompt: `Conversation:\nUser: ${data}\nAI: `,
    //             max_tokens: 10,
    //             temperature: 0.7
    //         },
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${process.env.OPEN_API_KEY}`
    //             }
    //         }
    //     );
    //     const message = response.data.choices[0].text.trim();
    //     res.json({ message });
    //     console.log('message: ', message);
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({ message: 'Server error 500.'});
    // }
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})