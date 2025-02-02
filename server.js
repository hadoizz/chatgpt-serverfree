import express, { json } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()


const configuration = new Configuration({

    apiKey: process.env.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,

});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX!'
    })
})

// app.post('/', async (req, res) => {
//   try {
//     const prompt = req.body.prompt;

//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `${prompt}`,
//       temperature: 0, // Higher values means the model will take more risks.
//       max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
//       top_p: 1, // alternative to sampling with temperature, called nucleus sampling
//       frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
//       presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
//     });

//     const responseJson = JSON.parse(response.data.choices[0].text);

//     res.status(200).send({
//       bot: responseJson
//     });

//   } catch (error) {
//     console.error(error)
//     res.status(500).send(error || 'Something went wrong');
//   }
// })

// http://localhost:5000/getCompletion?text=Hola mundo
app.post('/', async (req, res) => {
    console.log(req.body.prompt)
    const prompt = req.body.prompt;
    await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 1000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    }).then((openaiResponse) => {
        try {
            console.log(openaiResponse.data.choices[0].text)
            res.send(openaiResponse.data.choices[0].text);
        }
        catch (e) {
            console.error("Ha fallado la peti");
            res.status(500).send("Ha fallado la peti");
        }
    })
});


app.listen(5000, () => {
    console.log('AI server started on http://localhost:5000');
})


// POST, SET, GET, DELETE
