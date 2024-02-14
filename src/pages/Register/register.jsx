import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";

const RegisterPage = () => {
    
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
    //const [error, setError] = useState(null);
    const {register: userRegister, error, isLoading} = useRegister();

    const onSubmit = async(data) => {
        // data.preventDefault();
        console.log(data);

        await userRegister(data.mail, data.password);

    };

    return (
        <>
            {/* <div className="flex flex-col font-montserratalternates items-center justify-start mx-auto w-full"> */}
            <div className="bg-indigo-500 flex w-screen sm:flex-row flex-col h-screen overflow-hidden">
                    <h1 className="mt-[5%] mx-[10%] md:text-5xl lg:text-8xl text-white-A700 font-semibold">
                        Chessy
                    </h1>
                    {<div className="bg-white-A700 flex flex-col w-[80%] sm:w-[30%] sm:m-[5%] m-auto md:gap-10 gap-8 justify-start p-4 md:p-5 rounded-lg shadow-bs text-left">
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
                                            {...formRegister("mail", { required: true })} 
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
                                            {...formRegister("password", { required: true })} 
                                            className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                        {errors.password && <span>This field is required</span>}
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <button disabled={isLoading} type="submit" className="bg-indigo-500 flex flex-col h-auto items-center justify-center rounded-lg shadow-bs1 w-full">
                                        
                                        <strong className="text-2xl text-white-A700 font-medium">Log In</strong>
                                    </button>
                                    <div className="flex flex-col justify-start w-full font-regular text-orange h-auto text-left m-2 mr-auto">
                                        {error && <span className="">{error}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-[5%] m-2 mr-auto">
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
