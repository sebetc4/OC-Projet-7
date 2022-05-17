const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.sendMessage = async (req, res, next) => {

    const { message } = req.body

    try {
        const response = await openai.createCompletion("text-davinci-002", {
            prompt: message,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
        });

        res.status(200).json(response.data.choices[0].text)
    } catch (err) {
        next(err)
    }
}