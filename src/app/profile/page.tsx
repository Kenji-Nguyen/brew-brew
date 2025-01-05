import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '../login/actions'


export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (<div className="h-screen w-screen flex flex-col justify-center items-center"><p>Hello {data.user.email}</p>
    <button onClick={logout}>Logout</button></div>
  )
}