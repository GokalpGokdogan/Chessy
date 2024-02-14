// const stockfish = require('stockfish')//('../../node_modules/stockfish/src/stockfish-nnue-16');
// const engine = stockfish();

// //evaluate a position
// const eval = (req, res) => {
//     const {fen} = req.body;
//     engine.postMessage('position fen ' + fen);
//     engine.postMessage('go depth 10');
//     engine.onmessage = (line) => {
//         try{
//             if(line.startsWith('bestmove')){
//                 engine.terminate();
//                 res.status(200).json(line);
//             }
//         }
//         catch(err){
//             res.status(400).json({error: err.message});
//         }
//     }
// }




// //export functions
// module.exports = { eval };