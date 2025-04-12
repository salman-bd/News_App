"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Loader2, Facebook, Mail } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { SignInFormValues, signInSchema } from "@/lib/validations"



export default function SigninPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)

  // Initialize react-hook-form
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  async function onSubmit(data: SignInFormValues) {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        toast.error(result.error || "Failed to sign in")
        return
      }

      toast.success("Signed in successfully!")
      router.push(callbackUrl)
      router.refresh()
    } catch (error) {
      console.error("Sign in error:", error)
      toast.error("Failed to sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      setSocialLoading(provider)
      await signIn(provider, { callbackUrl })
    } catch (error) {
      console.error(`${provider} login error:`, error)
      toast.error(`An error occurred with ${provider} login. Please try again.`)
      setSocialLoading(null)
    }
  }



  return (
    <div className="container max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Sign in to your account</CardTitle>
          <CardDescription>Enter your email and password to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("google")}
            disabled={!!socialLoading}
            className="w-full"
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("facebook")}
            disabled={!!socialLoading}
            className="w-full"
          >
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-2 text-sm text-muted-foreground">or continue with</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Remember me</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Sign in with Email
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
