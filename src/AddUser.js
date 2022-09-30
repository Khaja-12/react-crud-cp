

import { useForm } from "react-hook-form";

export default function AddUser() {
  const { register, handleSubmit,formState: { errors } } = useForm();

  const url = 'https://jsonplaceholder.typicode.com/users'
  const onSubmit = data => fetch(url,{
    method:'POST',
    headers:{
      "Content-type":'application/json'
    },
    body:JSON.stringify(data)
  }).then((res)=>{
    res.json().then((result)=>{
      
      // alert('Successfully Updated')
     
    })
  })

// console.log(use)

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    
    <div>
      <input {...register("name", { required: true, maxLength: 20 })}   aria-invalid={errors.name ? "true" : "false"} placeholder="Enter Your Name"  />
      {errors.name?.type === 'required' && <p role="alert">name is required</p>}
      </div><br/>

    <div>
      <input {...register("username", { required: true, maxLength: 20 })}  aria-invalid={errors.username ? "true" : "false"} placeholder="Enter Your Username" />
      {errors.username?.type === 'required' && <p role="alert">username is required</p>}
      </div><br/>
       

      <div>
      <input 
        {...register("mail", { required: "Email is required" })} 
        aria-invalid={errors.mail ? "true" : "false"} placeholder="Enter Your Email"
      />
      {errors.mail && <p role="alert">{errors.mail?.message}</p>}
      </div><br/>

    <div>
      <input type="number" {...register("phone", { required: "Phone Number is required",  } )} aria-invalid={errors.phone ? "true" : "false"} placeholder="Enter Your Phone Number"  />
      {errors.phone && <p role="alert">{errors.phone?.message}</p>}
      </div><br/>
     
      <input type="submit" />
    </form>
    </>
  );
}