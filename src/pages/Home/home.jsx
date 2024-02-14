import React, {useState, useRef} from "react";
// import { useForm } from "react-hook-form";
// import ImageCropper from "../../components/imgCropper";
import { useLogout } from "../../hooks/useLogout";
import ChessBoard from "../../components/chessBoard";
import { Chess } from "chess.js";
import { useAI } from "../../hooks/useAI";
// import AiResponse from "../../components/aiResponse";
// import EngineView from "../../components/engineView";

const HomePage = () => {
    
    // const { register, handleSubmit, formState: { errors } } = useForm();
    // const [outputColor, setOutputColor] = useState('#ffffff');
    const {logout, isLoadingLogout} = useLogout();
    const {getAiResponse} = useAI();
    // const onSubmit = (data) => {
    //     if(game.turn()=='w'){setOutputColor('#ffffff');}else{setOutputColor('#000000');}
    //     console.log(data,outputColor);
    // };
    // const [modalOpen, setModalOpen] = useState(false);
    // const [imgHover, setImgHover] = useState(false);

    // const imgUrl = useRef(""
    // "https://avatarfiles.alphacoders.com/161/161002.jpg"
    // );
    
    // const updateImg = (imgSrc) => {
    // imgUrl.current = imgSrc;
    // console.log(imgUrl.current);
    // };
    
    
    
    const handleLogout = () => {
        logout()
        console.log("logout");
    };

    const [game, setGame] = useState(new Chess());
    const [pgn, setPgn] = useState('');
    const [moveError, setMoveError] = useState(false);
    const [aiResponse, setAiResponse] = useState('Waiting for response...');
    const [bestMove, setBestMove] = useState('Not yet calculated...');
    const [explanation, setExplanation] = useState('Not yet calculated...');

    const getMovesAsFENs = (chessObj) => {
        // console.log('chess obj: ',chessObj, typeof chessObj);
        // return
        var moves = chessObj//.filter((a) => a != '')//.history();
        const newGame = new Chess();
        
        for (var i = 0; i < moves.length; i++) {
            // console.log(moves[i]);
            if(moves[i]==''){
                continue;
            }
            try{
                setMoveError(false);
                newGame.move(moves[i]);
                
            }
            catch(e){
                console.log(e);
                setMoveError(true);
            }
          
        }
        return newGame
        
    }

    const handlePgnChanges = (e) => {
        
        // console.log("test #1")
        setPgn(e.target.value)   

        // console.log("test #2")

        let newGame = getMovesAsFENs(e.target.value.split(" ").filter((move) => {if(move.includes(".") || move.length == 1){return false;}else{return true;}}));
        // console.log("test #3")
        try{
            setGame(newGame);
            // console.log("test #4")
        }
        catch(e){
            console.log(e);
        }
        
    }

    const askAi = async () => {
        console.log(game.fen());
        // console.log("test #5")
        const response = await getAiResponse({fen: game.fen()});
        // console.log("test #6")

        console.log('Response: ', response);
        const json = JSON.parse(response);

        const best_move = json.best_move;
        const explanationAi = json.explanation;
        
        // console.log('Best move: ', best_move);
        // console.log('Explanation: ', explanationAi);

        setBestMove(best_move);
        setExplanation(explanationAi);
        setAiResponse(response);
    }

    
    return (
        <>
                <div className="bg-indigo-500 flex flex-row w-screen h-screen overflow-hidden">
                    <div className="flex flex-col mt-[3%] mx-[3%] w-[50%]">
                        <h1 className="md:text-3xl lg:text-5xl text-white-A700 text-left font-bold">
                            Chessy
                        </h1>
                        
                        {!moveError && (<div className="flex flex-col mt-[5%] md:w-full lg:w-5/6 justify-center items-center my-10 font-semibold mx-auto">
                            <ChessBoard game={game} setGame={setGame} pgn={pgn} setPgn={setPgn} />
                            {/*<EngineView game={game} setGame={setGame} pgn={pgn} setPgn={setPgn} />*/}
                        </div>)}
                        {moveError && (<div className="flex flex-col mt-[5%] h-full md:w-full lg:w-5/6 justify-center items-center mb-[50%] font-semibold mx-auto">
                            <p className="text-3xl md:text-2xl text-black-900 text-shadow-ts text-white-A700">
                                Invalid Move
                            </p>
                            </div>)
                        }

                    </div>
                    
                    {<div className="bg-white-A700 flex flex-col w-[50%] mr-0 ml-auto md:gap-10 gap-8 justify-start p-4 md:p-5 rounded-lg shadow-bs text-left">
                        <div className="flex flex-row justify-end">
                        <strong className="text-4xl md:text-5xl text-indigo-500 font-semibold text-mont mt-[3%]">
                            Moves
                        </strong>
                        
                        <button 
                            className="transition-colors duration-250 rounded-lg bg-indigo-500 ml-auto text-white-A700 font-medium text-lg hover:bg-white-A700 hover:text-indigo-500" 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        </div>
                        <div className="flex flex-col h-full">
                        {/* <form className="h-full" onSubmit={handleSubmit(onSubmit)}> */}
                            <div className="flex flex-col gap-6 md:gap-10 items-center justify-start mx-auto w-full h-full">
                                <div className="flex flex-col gap-6 md:gap-8 items-center justify-start w-full">
                                    <div className="flex flex-col gap-3 md:gap-5 justify-start w-full">
                                        <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                            Chess Moves in PGN
                                        </p>
                                        <input 
                                            type="text" 
                                            placeholder="1.e4 e5 2. Nf3 Nc6 3. Bc4 O-O 4. ..." 
                                            value={pgn}
                                            // {...register("PGN", { required: false })} 
                                            className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                            onChange={handlePgnChanges}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 md:gap-5 justify-start w-full">
                                        <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                            Best Move
                                        </p>
                                        <div className="p-2 border-2 border-gray-300 rounded-lg flex-row flex">
                                            <p>{bestMove}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 md:gap-5 justify-start w-full mb-[5%]">
                                        <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                            Explaination
                                        </p>
                                        <div className="p-2 border-2 border-gray-300 rounded-lg flex-row flex">
                                            <p>{explanation}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col mt-auto mb-[5%]">
                                    {/* <AiResponse fen={game.fen()} /> */}
                                    
                                    <button type="submit" onClick={askAi} className="bg-indigo-500 flex flex-col h-auto items-center justify-center rounded-lg shadow-bs1 w-full mt-auto mb-0">  
                                        <strong className="text-2xl text-white-A700 font-medium">Submit {/*outputColor*/} </strong>
                                    </button>
                                    
                                </div>
                            </div>
                        {/* </form> */}
                        </div>
                    </div>
                    }
                </div> 
        </>
    );
};

export default HomePage;
