import { redirect } from "next/navigation";
import { checkLoggedIn, login, signup } from "./actions";

export default async function LoginPage() {
  const { isLoggedIn } = await checkLoggedIn();

  if (isLoggedIn) {
    redirect("/profile");
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
    <form className="flex flex-col gap-2 ">
      <label htmlFor="email">Email:</label>
      <input className="text-black" id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input className="text-black" id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
    </div>
  )
}