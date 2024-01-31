import React, {useState, useRef} from "react";
import { useForm } from "react-hook-form";
import ImageCropper from "../../components/imgCropper";
import { useLogout } from "../../hooks/useLogout";
const HomePage = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [outputColor, setOutputColor] = useState('black-900');
    const {logout, isLoadingLogout} = useLogout();
    const onSubmit = (data) => {
        if(outputColor == 'black-900'){setOutputColor('white-A700');}else{setOutputColor('black-900');}
        console.log(data,outputColor);
    };
    const [modalOpen, setModalOpen] = useState(false);
    const [imgHover, setImgHover] = useState(false);

    const imgUrl = useRef(""
    // "https://avatarfiles.alphacoders.com/161/161002.jpg"
    );
    
    const updateImg = (imgSrc) => {
    imgUrl.current = imgSrc;
    console.log(imgUrl.current);
    };
    const handleLogout = () => {
        logout()
        console.log("logout");
    };


    const importButton= <button className="rounded-lg bg-indigo-500" onClick={() => setModalOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 200 200" fill="#382ad6">
                                <g style={{mixBlendMode: "multiply"}} filter="url(#filter0_i_10_1057)">
                                    <path d="M0 40C0 17.9086 17.9086 0 40 0H160C182.091 0 200 17.9086 200 40V160C200 182.091 182.091 200 160 200H40C17.9086 200 0 182.091 0 160V40Z" fill="#382ad6"/>
                                </g>
                                <g filter="url(#filter1_d_10_1057)">
                                    <path d="M25 100H175M100 175V25" stroke="white" strokeWidth="10" strokeLinecap="round"/>
                                </g>
                                <defs>
                                <filter id="filter0_i_10_1057" x="0" y="0" width="200" height="200" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="4"/>
                                        <feGaussianBlur stdDeviation="2"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_10_1057"/>
                                    </filter>
                                    <filter id="filter1_d_10_1057" x="14.5" y="18.5" width="171" height="171" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="4"/>
                                        <feGaussianBlur stdDeviation="2"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_1057"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10_1057" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </button>;
    return (
        <>
            {/* <div className="flex flex-col font-montserratalternates items-center justify-start mx-auto w-full"> */}
                <div className="bg-indigo-500 flex flex-row w-screen h-screen overflow-hidden">
                    <div className="flex flex-col mt-[3%] mx-[3%] w-[50%]">
                        <h1 className="md:text-3xl lg:text-5xl text-white-A700 text-left font-bold">
                            Chessy
                        </h1>
                        {modalOpen ? (
                            // <Modal updateImg={updateImg} closeModal={() => setModalOpen(false)} />
                            <div className="flex flex-col mt-[5%] w-full justify-center items-center my-[10%] font-semibold">
                                
                                <div className="flex flex-col w-full justify-center items-center">
                                
                                <>
                                    <h2 className="md:text-xl lg:text-2xl text-white-A700 m-[5%]">
                                    Please add an image to analyze.
                                    </h2>
                                    <div className="flex flex-row justify-center items-center max-w-[50%] aspect-square">
                                    <ImageCropper
                                        updateImg={updateImg}
                                        closeModal={(e) => {setModalOpen(e); console.log(e)}}  
                                    />
                                    </div>
                                </>
                                
                                </div>
                            </div>
                        ) : (imgUrl.current == "" ? (
                            <div className="flex flex-col mt-[5%] w-full justify-center items-center my-[10%] font-semibold">
                                
                                <div className="flex flex-col w-full justify-center items-center">
                                
                                <>
                                    <h2 className="md:text-xl lg:text-2xl text-white-A700 m-[5%]">
                                    Please add an image to analyze.
                                    </h2>
                                    <div className="flex flex-row justify-center items-center max-w-[50%] aspect-square">
                                    <ImageCropper
                                        updateImg={updateImg}
                                        closeModal={(e) => {setModalOpen(e); console.log(e)}}  
                                    />
                                    </div>
                                </>
                                
                                </div>
                            </div>) : (
                                <div onClick={() => setModalOpen(true)} className="flex flex-col mt-[0%] h-full w-full justify-center items-center my-[10%] font-semibold relative group">
                                
                                    <div className="flex flex-col w-full justify-center items-center transition duration-500 ease-in-out transform opacity-100 hover:opacity-30">
                                        <img
                                            onMouseEnter={() => setImgHover(true)}
                                            onMouseLeave={() => setImgHover(false)}
                                            src={imgUrl.current}
                                            className="w-[50%] aspect-square rounded-lg shadow-bs "
                                        />
                                        
                                    </div>
                                    <p className={`flex mt-[5%] items-center justify-center text-2xl text-white-A700 ${imgHover?`opacity-100`:`opacity-0`} transition duration-500 ease-in-out`}>
                                            Delete Image?
                                    </p>
                                </div>
                              
                            )
                        )}


                    </div>
                    
                    {<div className="bg-white-A700 flex flex-col w-[50%] mr-0 ml-auto md:gap-10 gap-8 justify-start p-4 md:p-5 rounded-lg shadow-bs text-left">
                        <div className="flex flex-row justify-end">
                        <strong className="text-4xl md:text-5xl text-indigo-500 font-semibold text-mont mt-[3%]">
                            Moves
                        </strong>
                        <button className="rounded-lg bg-indigo-500 ml-auto text-white-A700 font-medium" onClick={handleLogout}>
                             
                            Logout
                        </button>
                        </div>
                        <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6 md:gap-10 items-center justify-start mx-auto w-full h-full">
                                <div className="flex flex-col gap-6 md:gap-8 items-center justify-start w-full">
                                    <div className="flex flex-col gap-3 md:gap-5 justify-start w-full">
                                        <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                            Chess Moves in FEN
                                        </p>
                                        <input 
                                            type="text" 
                                            placeholder="1.e4 e5 2. Nf3 Nc6 3. Bc4 O-O 4. ..." 
                                            {...register("FEN", { required: false })} 
                                            className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                        {errors.FEN && <span>This field is required</span>}
                                    </div>
                                    <div className="flex flex-col gap-3 md:gap-5 justify-start w-full">
                                        <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                            Best Move
                                        </p>
                                        <div className="p-2 border-2 border-gray-300 rounded-lg flex-row flex">
                                            <div className={`bg-${outputColor} border border-gray-500 w-4 h-4 my-auto mr-2`}></div> <p>e5</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col mt-auto mb-[5%]">
                                    <button type="submit" className="bg-indigo-500 flex flex-col h-auto items-center justify-center rounded-lg shadow-bs1 w-full mt-auto mb-0">  
                                        <strong className="text-2xl text-white-A700 font-medium">Submit</strong>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    }
                </div> 
            {/* </div> */}
        </>
    );
};

export default HomePage;
