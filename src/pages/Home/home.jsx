import React, {useState, useRef} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ImageUploading } from 'react-images-uploading';
import Modal from "../../components/modal";
import ImageCropper from "../../components/imgCropper";
const HomePage = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [outputColor, setOutputColor] = useState("black-900");
    const onSubmit = (data) => {
        if(outputColor == "black-900"){setOutputColor("white-A700");}else{setOutputColor("black-900");}
        console.log(data);
    };
    const [modalOpen, setModalOpen] = useState(false);

    const imgUrl = useRef(""
    // "https://avatarfiles.alphacoders.com/161/161002.jpg"
    );
    
    const updateImg = (imgSrc) => {
    imgUrl.current = imgSrc;
    console.log(imgUrl.current);
    };


    
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
                            <ImageCropper
                                updateImg={updateImg}
                                closeModal={() => setModalOpen(false)}  
                            />
                        ) : (imgUrl.current == "" ? (
                            <div className="flex flex-col mt-[5%] w-full justify-center items-center my-[10%] font-semibold">
                                
                                <div className="flex flex-col w-full justify-center items-center">
                                
                                <>
                                    <h2 className="md:text-xl lg:text-2xl text-white-A700 m-[5%]">
                                    Please add an image to analyze.
                                    </h2>
                                    {importButton}
                                </>
                                
                                </div>
                            </div>) : (
                                <div className="flex flex-col mt-[0%] h-full w-full justify-center items-center my-[10%] font-semibold">
                                    <img onClick={()=>setModalOpen(true)} src={imgUrl.current} className="w-[50%] aspect-square rounded-lg shadow-bs" />
                                </div>
                            )
                        )}


                    </div>
                    
                    {<div className="bg-white-A700 flex flex-col w-[50%] mr-0 ml-auto md:gap-10 gap-8 justify-start p-4 md:p-5 rounded-lg shadow-bs text-left">
                        <strong className="text-4xl md:text-5xl text-indigo-500 font-semibold text-mont mt-[3%]">
                            Moves
                        </strong>
                        <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6 md:gap-10 items-center justify-start mx-auto w-full h-full">
                                <div className="flex flex-col gap-6 md:gap-8 items-center justify-start w-full">
                                    <div className="flex flex-col gap-3 md:gap-5 justify-start w-full">
                                        <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                            Chess Moves in SAN
                                        </p>
                                        <input 
                                            type="text" 
                                            placeholder="1.e4 e5 2. Nf3 Nc6 3. Bc4 O-O 4. ..." 
                                            {...register("SAN", { required: false })} 
                                            className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                        {errors.SAN && <span>This field is required</span>}
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
