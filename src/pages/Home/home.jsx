import React, {useState, useEffect} from "react";
// import { useForm } from "react-hook-form";
// import ImageCropper from "../../components/imgCropper";
import { useLogout } from "../../hooks/useLogout";
import ChessBoard from "../../components/chessBoard";
import { Chess } from "chess.js";
import { useAI } from "../../hooks/useAI";
// import AiResponse from "../../components/aiResponse";
// import EngineView from "../../components/engineView";

const HomePage = () => {

    const {logout, isLoadingLogout} = useLogout();
    const {getAiResponse} = useAI();

    const [game, setGame] = useState(new Chess());
    const [pgn, setPgn] = useState('');
    const [moveError, setMoveError] = useState(false);
    const [bestMove, setBestMove] = useState('Not yet calculated...');
    const [explanation, setExplanation] = useState('Not yet calculated...');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [boardOn, setBoardOn] = useState(false);

    const handleLogout = () => {
        logout()
        console.log("logout");
    };

    const getMovesAsFENs = (chessObj) => {
        
        const newGame = new Chess();
        
        for (var i = 0; i < moves.length; i++) {
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
        return newGame;  
    }

    const handlePgnChanges = (e) => {
        
        setPgn(e.target.value)   
        let newGame = getMovesAsFENs(e.target.value.split(" ").filter((move) => {if(move.includes(".") || move.length == 1){return false;}else{return true;}}));
        
        try{
            setGame(newGame);
        }
        catch(e){
            console.log(e);
        }
    }

    const toBoard = () => {
        setBoardOn(!boardOn);
    }

    const askAi = async () => {
        console.log(game.fen());
        const response = await getAiResponse({fen: game.fen()});

        console.log('Response: ', response);
        const json = JSON.parse(response);

        const best_move = json.best_move;
        const explanationAi = json.explanation;

        setBestMove(best_move);
        setExplanation(explanationAi);

        if(windowWidth < 640 && boardOn){
            setBoardOn(false)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    
    return (
        <>
                {windowWidth >= 640 ? (<div className="bg-indigo-500 flex flex-row w-screen h-screen overflow-hidden">
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
                                    <div className="flex flex-col gap-3 md:gap-5 justify-start w-full">
                                        <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                            Explaination
                                        </p>
                                        <div className="p-2 border-2 border-gray-300 rounded-lg flex-row flex" style={{minHeight: '7.5em', maxHeight: '15em'}}>
                                            <p>{explanation}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col mt-auto mb-[5%]">
                                    {/* <AiResponse fen={game.fen()} /> */}
                                    
                                    <button type="submit" onClick={askAi} className="bg-indigo-500 flex flex-col h-auto items-center justify-center rounded-lg shadow-bs1 w-full mt-auto mb-0 text-white-A700 transition-colors duration-250 hover:text-indigo-500 hover:bg-white-A700">  
                                        <strong className="text-2xl font-medium">Submit {/*outputColor*/} </strong>
                                    </button>
                                    
                                </div>
                            </div>
                        {/* </form> */}
                        </div>
                    </div>
                    }
                </div> ) : (
                    <>
                    {
                        boardOn ? ( <> 
                        
                        <div className="bg-indigo-500 flex flex-col w-screen h-screen overflow-hidden">
                    <div className="flex flex-col mt-[3%] mx-[3%] w-[90%] h-full mx-auto">
                        
                        <div className="flex flex-row items-center">
                            <h1 className="text-4xl text-white-A700 text-left font-bold">
                                Chessy
                            </h1>
                            
                            <button 
                                className="mr-[0%] bg-white-A700 rounded-lg ml-auto text-indigo-500 font-medium text-sm transition-colors duration-250 hover:bg-indigo-500 hover:text-white-A700" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>
                        {!moveError && (<div className="flex flex-col mt-[5%] w-full justify-center items-center my-10 font-semibold mx-auto">
                            <ChessBoard game={game} setGame={setGame} pgn={pgn} setPgn={setPgn} />
                            </div>)}
                        {moveError && (<div className="flex flex-col mt-[5%] h-full md:w-full lg:w-5/6 justify-center items-center mb-[50%] font-semibold mx-auto">
                            <p className="text-3xl md:text-2xl text-black-900 text-shadow-ts text-white-A700">
                                Invalid Move
                            </p>
                            </div>)
                        }

                    </div>
                    
                    {<div className="bg-white-A700 flex flex-col w-[90%] mb-[3%] mt-auto h-auto mx-auto md:gap-5 gap-4 justify-start p-4 md:p-5 rounded-lg shadow-bs text-left">
                        <div className="flex flex-row justify-between">
                            <strong className="text-2xl md:text-2xl text-indigo-500 font-semibold text-mont mt-[3%]">
                                Moves
                            </strong>
                            <div className="flex flex-row justify-end">
                                <button className="flex p-[5%] transition-colors duration-250 rounded-lg bg-indigo-500 ml-auto text-white-A700 font-medium text-sm active:bg-white-A700 active:text-indigo-500" 
                                    onClick={toBoard}>
                                        Go To Chessboard
                                </button>    
                            </div>                 
                        </div>
                        <div className="flex flex-col h-full">
                        {/* <form className="h-full" onSubmit={handleSubmit(onSubmit)}> */}
                            {/* <div className="flex flex-col gap-3 md:gap-5 items-center justify-start mx-auto w-full h-full">
                                <div className="flex flex-col  items-center justify-start w-full"> */}
                                    {/* <div className="flex flex-col  justify-start w-full">
                                        <p className="text-md md:text-md text-black-900 text-shadow-ts" style={{ fontSize: '3vh', minFontSize: '16px', maxFontSize: '36px' }}>
                                            Chess Moves in PGN
                                        </p>
                                        <input 
                                            type="text" 
                                            placeholder="1.e4 e5 2. Nf3 Nc6 3. Bc4 O-O 4. ..." 
                                            value={pgn}
                                            // {...register("PGN", { required: false })} 
                                            className="p-2 border-2 border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500"
                                            onChange={handlePgnChanges}
                                            style={{ fontSize: '2vh', minFontSize: '16px', maxFontSize: '36px' }}
                                        />
                                    </div> */}
                                    {/* <div className="flex flex-col  md:gap-5 justify-start w-full">
                                        <p className="text-md md:text-md text-black-900 text-shadow-ts" style={{ fontSize: '3vh', minFontSize: '16px', maxFontSize: '36px' }}>
                                            Best Move
                                        </p>
                                        <div className="p-2 border-2 border-gray-300 rounded-sm flex-row flex" style={{ fontSize: '2vh', minFontSize: '16px', maxFontSize: '36px' }}>
                                            <p>{bestMove}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col  md:gap-5 justify-start w-full">
                                        <p className="text-md md:text-md text-black-900 text-shadow-ts" style={{ fontSize: '3vh', minFontSize: '16px', maxFontSize: '36px' }}>
                                            Explaination
                                        </p>
                                        <div className="p-2 border-2 border-gray-300 rounded-lg flex-row flex text-sm" style={{minHeight: '7.5em', maxHeight: '20em', fontSize: '2vh', minFontSize: '16px', maxFontSize: '36px'}}>
                                            <p>{explanation}</p>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="w-full flex flex-col mt-auto mb-[5%]">
                                    {/* <AiResponse fen={game.fen()} /> */}
                                    
                                    <button type="submit" onClick={askAi} className="bg-indigo-500 flex flex-col h-auto text-white-A700 items-center justify-center rounded-lg shadow-bs1 w-full mt-auto mb-0 transition-colors duration-250 active:bg-white-A700 active:text-indigo-500">  
                                        <strong className="text-2xl font-medium">Submit {/*outputColor*/} </strong>
                                    </button>
                                    
                                </div>
                            </div>
                        {/* </form> */}
                        </div>
                    // </div>
                    }
                </div>
                        
                        </>):(
                    // Mobile View
                    <div className="bg-indigo-500 flex flex-col w-screen h-screen overflow-hidden">
                    <div className="flex flex-col mt-[3%] mx-[3%] w-[90%] h-auto mx-auto">
                        
                        <div className="flex flex-row items-center">
                            <h1 className="text-4xl text-white-A700 text-left font-bold">
                                Chessy
                            </h1>
                            
                            <button 
                                className="mr-[0%] bg-white-A700 transition-colors duration-250 rounded-lg ml-auto text-indigo-500 font-medium text-sm hover:bg-indigo-500 hover:text-white-A700" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>
                        

                    </div>
                    
                    {<div className="bg-white-A700 flex flex-col w-[90%] mb-[3%] mt-[5%] h-full mx-auto md:gap-5 gap-4 justify-start p-4 md:p-5 rounded-lg shadow-bs text-left">
                        
                        <div className="flex flex-row justify-between">
                            <strong className="text-2xl md:text-2xl text-indigo-500 font-semibold text-mont mt-[3%]">
                                Moves
                            </strong>
                            <div className="flex flex-row justify-end">
                                <button className="flex p-[5%] transition-colors duration-250 rounded-lg bg-indigo-500 ml-auto text-white-A700 font-medium text-sm active:bg-white-A700 active:text-indigo-500" 
                                    onClick={toBoard}>
                                        Go To Chessboard
                                </button>    
                            </div>                  
                        </div>
                        
                        <div className="flex flex-col h-full">
                        {/* <form className="h-full" onSubmit={handleSubmit(onSubmit)}> */}
                            <div className="flex flex-col gap-3 md:gap-5 items-center justify-start mx-auto w-full h-full">
                                <div className="flex flex-col  items-center justify-start w-full">
                                    <div className="flex flex-col  justify-start w-full">
                                        <p className="text-md md:text-md text-black-900 text-shadow-ts" style={{ fontSize: '3vh', minFontSize: '16px', maxFontSize: '36px' }}>
                                            Chess Moves in PGN
                                        </p>
                                        <input 
                                            type="text" 
                                            placeholder="1.e4 e5 2. Nf3 Nc6 3. Bc4 O-O 4. ..." 
                                            value={pgn}
                                            // {...register("PGN", { required: false })} 
                                            className="p-2 border-2 border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500"
                                            onChange={handlePgnChanges}
                                            style={{ fontSize: '2vh', minFontSize: '16px', maxFontSize: '36px' }}
                                        />
                                    </div>
                                    <div className="flex flex-col  md:gap-5 justify-start w-full">
                                        <p className="text-md md:text-md text-black-900 text-shadow-ts" style={{ fontSize: '3vh', minFontSize: '16px', maxFontSize: '36px' }}>
                                            Best Move
                                        </p>
                                        <div className="p-2 border-2 border-gray-300 rounded-sm flex-row flex" style={{ fontSize: '2vh', minFontSize: '16px', maxFontSize: '36px' }}>
                                            <p>{bestMove}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col  md:gap-5 justify-start w-full">
                                        <p className="text-md md:text-md text-black-900 text-shadow-ts" style={{ fontSize: '3vh', minFontSize: '16px', maxFontSize: '36px' }}>
                                            Explaination
                                        </p>
                                        <div className="p-2 border-2 border-gray-300 rounded-lg flex-row flex text-sm" style={{minHeight: '7.5em', maxHeight: '20em', fontSize: '2vh', minFontSize: '16px', maxFontSize: '36px'}}>
                                            <p>{explanation}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col mt-auto mb-[5%]">
                                    {/* <AiResponse fen={game.fen()} /> */}
                                    
                                    <button type="submit" onClick={askAi} className="bg-indigo-500 flex flex-col h-auto items-center justify-center rounded-lg shadow-bs1 w-full mt-auto mb-0 transition-colors duration-250 text-white-A700 active:bg-white-A700 active:text-indigo-500">  
                                        <strong className="text-2xl font-medium">Submit {/*outputColor*/} </strong>
                                    </button>
                                    
                                </div>
                            </div>
                        {/* </form> */}
                        </div>
                    </div>
                    }
                </div>) 
                }
                </>
                )}
        </>
    );
};

export default HomePage;
