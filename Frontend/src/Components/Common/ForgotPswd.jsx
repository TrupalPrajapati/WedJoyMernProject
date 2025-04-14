import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';

export const ForgotPswd = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const submitHadler = async(data)=>{
        try{
            console.log(data);
            const res = await axios.post("/user/forgotpassword/",data);
            console.log(res);
            console.log(res.data);
            
            console.log(res.data.data);
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div>
        <h1>Forgot Password</h1>
        <form onClick={handleSubmit(submitHadler)}>
            <label>Enter your Email:</label>
            <input type="text"  {...register("email", { required: "Email is required*" })}/>
            <input type="submit" />
        </form>
    </div>
  )
}
