import React from "react";

const LoginPage = () => {
    return (
        <>
            {/* <div className="flex flex-col font-montserratalternates items-center justify-start mx-auto w-full"> */}
                <div className="bg-indigo-500 flex w-screen h-screen">
                    <h1 className="md:mt-0 mt-[88px] md:text-5xl text-8xl text-white-A700">
                        Chessy
                    </h1>
                    {<div className="bg-white-A700 flex flex-col w-[30%] m-20 md:gap-10 gap-8 justify-start p-4 md:p-5 rounded-lg shadow-bs">
                        <strong className="text-4xl md:text-5xl text-indigo-500 font-bold">
                            Login
                        </strong>
                        <div className="flex flex-col gap-6 md:gap-10 items-center justify-start mx-auto w-full">
                            <div className="flex flex-col gap-6 md:gap-8 items-center justify-start w-full">
                                <div className="flex flex-col gap-3 md:gap-5 justify-start w-full">
                                    <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                        Mail
                                    </p>
                                    <button className="cursor-pointer leading-normal w-full text-xl md:text-2xl text-center">
                                        Mail
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3 md:gap-5 justify-start w-full">
                                    <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                        Password
                                    </p>
                                    <button className="cursor-pointer leading-normal w-full text-xl md:text-2xl text-center">
                                        Mail
                                    </button>
                                </div>
                            </div>
                            <button className="bg-indigo-500 flex flex-col h-auto items-center justify-center rounded-lg shadow-bs1 w-full">
                                {/* <img src="images/img_arrowright.svg" alt="Arrow" />*/}
                                <strong className="text-2xl md:text-4xl text-white-A700">Log In</strong>
                            </button>
                        </div>
                    </div>
                    }
                </div> 
            {/* </div> */}
        </>
    );
};

export default LoginPage;
