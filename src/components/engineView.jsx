import React, { useEffect, useState, useRef } from 'react';
import { Chess } from 'chess.js';


const EngineView = ({game, setGame, pgn, setPgn, bestMove, setBestMove}) => {
    const [msg, setMsg] = useState('');
    const engineWorker = useRef(null);

    useEffect(() => {
      engineWorker.current = new Worker("/stockfish.js");
      engineWorker.current.postMessage("uci");
      engineWorker.current.postMessage("ucinewgame");
      engineWorker.current.postMessage("position fen " + game.fen());
      engineWorker.current.postMessage("go depth 10");
      engineWorker.current.onmessage = (event) => {
        const message = event.data;
        // console.log(message);
        if(message.startsWith("bestmove")) {
          const bestMove = message.split(" ")[1];
          const newGame = new Chess();
          newGame.load(game.fen()); // Load the current game state from a FEN string
          newGame.move({
            from: bestMove.substring(0, 2),
            to: bestMove.substring(2, 4)
          });
          const newPgn = newGame.pgn(); // Get the new PGN after the move
          // console.log(newPgn); // Log the new PGN
          let recommendedMove = newPgn.split(" ")[newPgn.split(" ").length-1];
          // console.log(recommendedMove); // Log the result of the game
          setMsg(recommendedMove);
          setBestMove(recommendedMove);
        }
      };
    }, [game]);
    
    // useEffect(() => {
        
    //     let engine = new Worker('../../node_modules/stockfish/src/stockfish-nnue-16.js');

    //     let evaluations =[];

    //     engine.onmessage = function (event) {
    //       let message = event.data;
    //       console.log(message);
    //       if(message.startsWith("info depth 10")) {
    //         let multipvIndex = message.indexOf("multipv");
    //         if(multipvIndex!==-1) {
    //           let multipvString = message.slice(multipvIndex).split(" ")[1];
    //           let multipv = parseInt(multipvString);
    //           let scoreIndex = message.indexOf("score cp");
    //           if(scoreIndex!==-1) {
    //             let scoreString = message.slice(scoreIndex).split(" ")[2];
    //             let evaluation = parseInt(scoreString)/100;
    //             evaluation = isWhiteTurn ? evaluation : evaluation * -1;
    //             evaluations[multipv-1] = evaluation;
    //           } else {
    //             scoreIndex = message.indexOf("score mate");
    //             scoreString = message.slice(scoreIndex).split(" ")[2];
    //             evaluation = parseInt(scoreString);
    //             evaluation = Math.abs(evaluation);
    //             evaluations[multipv-1] = "#" + evaluation;
    //           }
    //           let pvIndex = message.indexOf(" pv ");
    //           if(pvIndex !== -1) {
    //             let pvString = message.slice(pvIndex+4).split(" ");
    //             if(evaluations.length===1) {
    //               callback(evaluations);
    //             }
    //           }
    //         }
    //       }
    //     }
    //      engine.postMessage("uci");
    //      engine.postMessage("isready");
    //      engine.postMessage("ucinewgame");
    //      engine.postMessage("setoption name multipv value 3");
    //      engine.postMessage("position fen "+fen);
    //      engine.postMessage("go depth 10");
    //     return () => {
    //         engine.terminate();
    //     };
    // }, []);
    /*useEffect(() => {
      
      getEvaluation(game.fen(),()=>{})
      
    
    }, [game]);
    function getEvaluation(fen,callback) {
      var engine = new Worker("../../node_modules/stockfish/src/stockfish-nnue-16.js");
      let evaluations =[];
      
      setMsg("Thinking...")
      engine.onmessage = function (event) {
        let message = event.data;
        console.log(message);
        if(message.startsWith("info depth 10")) {
          let multipvIndex = message.indexOf("multipv");
          if(multipvIndex!==-1) {
            let multipvString = message.slice(multipvIndex).split(" ")[1];
            let multipv = parseInt(multipvString);
            let scoreIndex = message.indexOf("score cp");
            if(scoreIndex!==-1) {
              let scoreString = message.slice(scoreIndex).split(" ")[2];
              let evaluation = parseInt(scoreString)/100;
              evaluation = isWhiteTurn ? evaluation : evaluation * -1;
              evaluations[multipv-1] = evaluation;
            } else {
              scoreIndex = message.indexOf("score mate");
              scoreString = message.slice(scoreIndex).split(" ")[2];
              let evaluation = parseInt(scoreString);
              evaluation = Math.abs(evaluation);
              evaluations[multipv-1] = "#" + evaluation;
            }
            let pvIndex = message.indexOf(" pv ");
            if(pvIndex !== -1) {
              let pvString = message.slice(pvIndex+4).split(" ");
              if(evaluations.length===1) {
                callback(evaluations);
              }
            }
          }
        }
      }
       engine.postMessage("uci");
       engine.postMessage("isready");
       engine.postMessage("ucinewgame");
       engine.postMessage("setoption name multipv value 3");
       engine.postMessage("position fen "+fen);
       engine.postMessage("go depth 10");

       setMsg(evaluations[0])
    }
    */


    return (
        <div>
            {/* <p className="text-white-A700">Engine: {msg}</p> */}
        </div>
    );
}

export default EngineView;