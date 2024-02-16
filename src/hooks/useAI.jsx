// import { useState } from 'react';


// Desc: Custom hook to interact with the AI API

export const useAI = () => {
    // const [responded, setResponded] = useState('Waiting for response...');
    const getAiResponse = async ({fen}) => {
        // console.log('FEN: ', fen);
        let promptBody = "Given the FEN position " +
                        fen + 
                        ", explain the best move. Provide a brief and informative explanation of the strategic advantages it offers."+
                        "Check your answer for accuracy by consulting a chess engine.";


        // console.log('Prompt: ', promptBody);
        // const response = await axios.post('/api/ai/ask', {promptBody});
        const response = await fetch('/api/ai/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt: promptBody})
        });

        console.log('Response: ', response);

        const json = await response.json();

        // const best_move = await response.best_move.json();
        // const explanation = await response.explanation.json();



        if(!response.ok) {
            console.log('Error: ', json.error);
        }
        if(response.ok) {
            console.log('Success: ', json);
        }

        return json;//{json, best_move, explanation};
    };

    return {getAiResponse/*, responded*/};
};