'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Button } from '@/components/ui/Button'

import type { Database } from '@/lib/database.types'
import { Toaster, toast } from 'sonner'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [login, setLogin] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()


  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    supabase.auth.getSession().then((res) => {
        console.log(res)
      if (!res.data.session) {
        setIsOpen(true);
        return;
      }
    });
  }, [router, supabase]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const toggleLogin = async (e: any) => {
    e.preventDefault()
    setLogin(!login)
  }
  return (
    <div>    
    <Toaster/>
    <Dialog open={isOpen && login} onOpenChange={setIsOpen}>
        <DialogContent className="p-6">
            <h3 className="text-lg my-1">Please sign in to continue</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                setIsLoading(true);

                // first check if the username exists or not
                const { data, error } = await supabase
                  .from("profiles")
                  .select()
                  .eq("username", username.trim());

                if (data && data?.length > 0) {
                  //@ts-ignore
                  return toast.error(
                    "username already exists, please use another"
                  );
                }

                const { data: handleSignUp, error: signUpError } =
                  await supabase.auth.signUp({
                    email: email,
                    password: password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                        data: { username: username,
                        full_name: fullName}
                      },
                    },
                  );

                
                if (signUpError) {
                  //@ts-ignore
                  return toast.error(signUpError.message);
                }
                //@ts-ignore
                toast.success("registered successfully");
                setIsLoading(false);
              }}
            >
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="password"
                min={3}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="my-2"
              />
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="my-2"
              />
              <Input
                type="text"
                placeholder="full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="my-2"
              />
              <div className="flex w-full justify-end">
                <Button onClick={toggleLogin}>
                  Login
                </Button>
              </div>
              <div className="flex w-full justify-end">
                <Button disabled={isLoading}>Sign up!</Button>
              </div>
            </form>
        </DialogContent>
    </Dialog>


    <Dialog open={isOpen && !login} onOpenChange={setIsOpen}>
        <DialogContent className="p-6">
            <h3 className="text-lg my-1">Please login to continue</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                setIsLoading(true);

                const { data: signInWithPassword, error: signUpError } =
                  await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                    },
                  );

                
                if (signUpError) {
                  //@ts-ignore
                  return toast.error(signUpError.message);
                }
                //@ts-ignore
                toast.success("loged in successfully");
                setIsLoading(false);
              }}
            >
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="password"
                min={3}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="my-2"
              />
              <div className="flex w-full justify-end">
                <Button onClick={toggleLogin}>
                  Create account
                </Button>
              </div>
              <div className="flex w-full justify-end">
                <Button disabled={isLoading}>Login</Button>
              </div>
            </form>

        </DialogContent>
    </Dialog>
    {/* <>
      <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
    </> */}
    </div>
  )
}