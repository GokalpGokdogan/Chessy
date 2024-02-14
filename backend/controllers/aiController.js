// const  { Configuration, OpenAIApi } = require('openai');
const OpenAI = require('openai');
// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const aiExplain = async (req, res) => {
    const {prompt} = req.body;

    console.log(prompt,"check", req.body)//,typeof promptBody,req.body);
    
    try{
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            response_format: { "type": "json_object" },
            messages: [
                {
                    role: "system",
                    content: "You will explain the chess bestmoves according to the given FEN. This will be a json response."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 150,
            // prompt: prompt,
            temperature: 0,
        });

        console.log(response.choices[0].message.content);
        // console.log(response.data);
        // console.log(response.data.choices[0].text);
        
        res.status(200).json(response.choices[0].message.content);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}




// export functions
module.exports = { aiExplain };