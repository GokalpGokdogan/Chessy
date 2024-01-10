import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { Button } from "@material-ui/core";

const RegisterPage = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
      console.log(data);
    };

    return (
        <>
            {/* <div className="flex flex-col font-montserratalternates items-center justify-start mx-auto w-full"> */}
                <div className="bg-indigo-500 flex w-screen h-screen overflow-hidden">
                    <h1 className="mt-[5%] mx-[10%] md:text-5xl lg:text-8xl text-white-A700">
                        Chessy
                    </h1>
                    {<div className="bg-white-A700 flex flex-col w-[30%] m-[5%] md:gap-10 gap-8 justify-start p-4 md:p-5 rounded-lg shadow-bs text-left">
                        <strong className="text-4xl md:text-5xl text-indigo-500 font-semibold text-mont">
                            Register
                        </strong>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6 md:gap-10 items-center justify-start mx-auto w-full">
                                <div className="flex flex-col gap-6 md:gap-8 items-center justify-start w-full">
                                    <div className="flex flex-col gap-3 md:gap-5 justify-start w-full">
                                        <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                            Mail
                                        </p>
                                        <input 
                                            type="text" 
                                            placeholder="Mail" 
                                            {...register("mail", { required: true })} 
                                            className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                        {errors.mail && <span>This field is required</span>}
                                    </div>
                                    <div className="flex flex-col gap-3 md:gap-5 justify-start w-full">
                                        <p className="text-xl md:text-2xl text-black-900 text-shadow-ts">
                                            Password
                                        </p>
                                        <input 
                                            type="password" 
                                            placeholder="Password" 
                                            {...register("password", { required: true })} 
                                            className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                        {errors.password && <span>This field is required</span>}
                                    </div>
                                </div>
                                <button type="submit" className="bg-indigo-500 flex flex-col h-auto items-center justify-center rounded-lg shadow-bs1 w-full">
                                    
                                    <strong className="text-2xl text-white-A700 font-medium">Log In</strong>
                                </button>
                            </div>
                            <div className="mt-[5%]">
                                <Link className="" to="/login">Do you already have an account?</Link>
                            </div>
                            
                        </form>
                    </div>
                    }
                </div> 
            {/* </div> */}
        </>
    );
};

export default RegisterPage;
