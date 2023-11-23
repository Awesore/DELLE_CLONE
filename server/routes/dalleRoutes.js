
import express from "express";
import * as dotenv from 'dotenv';
import {OpenAI} from 'openai'


dotenv.config();

const router = express.Router();

// Тут через обнову скоротився код і не потрібно писати Configuration

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // це ключ який я передаю з OPENAI
});

router.route('/').get((req, res) => {
    res.send('Hello from VADDDDDDI-S!');
});

router.route('/').post(async (req, res) => {
    try {
        const {prompt} = req.body;

        const aiResponse = await openai.images.generate({
            // Замінив createImage на images.generate тому що обнова говорить писати так
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data[0].b64_json;
        // Я видалив .data перед aiResponse

        res.status(200).json({photo: image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.error.message)
        // Я видалив .response.data тому що вийшла обнова і тепер потрібно писати так
    }
})

export default router;
