import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessBoard = ({game, setGame, pgn, setPgn}) => {
        
        
        if (!(game instanceof Chess)) {
            console.error('game is not an instance of Chess');
            return null; // Don't render the component if game is not correct
        }

        
        function makeAMove(move) {
            const result = game.move(move);
            setGame(new Chess(game.fen()));
            return result;
        }
    
        function makeRandomMove() {
            const possibleMoves = game.moves();
            if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
                return; // exit if the game is over
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            makeAMove(possibleMoves[randomIndex]);
        }
    
        function onDrop(sourceSquare, targetSquare) {
            const move = makeAMove({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", // always promote to a queen for example simplicity
            });
            console.log(game.pgn());
    
            // illegal move
            if (move === null) return false;
            // setTimeout(makeRandomMove, 200);
            
            let pgnPart = "";
            if (game.turn() === "b"){
                console.log(game.moveNumber())
                pgnPart= game.moveNumber() + ". ";
                console.log(pgn);
            }
            
            
            setPgn( pgn + pgnPart + game.pgn().split(" ").pop() + " " );

            return true;
        }

        
    
        return (
            // <div className="m-[5%]">
                <Chessboard position={game.fen()} onPieceDrop={onDrop} />
            // </div>        
        );
}
export default ChessBoard;