import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
const SigninForm = () => {
  const isLoading=false
  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email:"",
      password:""
    },
  })


  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    try{
      const res=await axios.post("http://localhost:4000/user/signin", values, { withCredentials: true }) // Allow cookies
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">To use VibeNest enter your details</p>
      </div>


      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-95 mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad_button_primary">
          {isLoading ? (
            <div className="flex-center gap-2">
             <Loader/> Loading...
            </div>
          ): "Sign in"}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          New user?
          <Link to="/sign-up" className="text-primary-500 text-small-semibold 
          ml-1">Click here </Link>
          to sign up!
        </p>
      </form>
    </Form>
  )
}

export default SigninForm
