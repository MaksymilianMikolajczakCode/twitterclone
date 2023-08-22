'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"

import type { Database } from '@/lib/database.types'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
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

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

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

  return (
    <div>    
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  return toast.error(
                    "username already exists, please use another"
                  );
                }

                const { data: signUpData, error: signUpError } =
                  await supabase.auth.signInWithOtp({
                    email: email.trim(),
                    options: {
                      data: {
                        username,
                        full_name: fullName,
                      },
                    },
                  });

                if (signUpError) {
                  return toast.error(signUpError.message);
                }
                toast.success("magic link sent successfully");
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
                placeholder="username"
                min={3}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="my-2"
              />
              <Input
                type="text"
                placeholder="your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="my-2"
              />
              <p className="text-sm text-gray-900 my-2">
                you will receive a login magic link!
              </p>
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