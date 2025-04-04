'use client'

import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInFormSchema } from "@/lib/auth-schema"
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
 

export default function SignIn() {
    const router = useRouter();

    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof signInFormSchema>) {
        const { email, password } = values;
        const { data, error } = await authClient.signIn.email({
            email,
            password,
        }, {
            onSuccess: () => {
                toast({
                    title: "Successfully Signed In",
                })
                router.push("/");
            },
            onError: (ctx) => {
                form.setError('email', {
                    type: 'manual',
                    message: ctx.error.message
                })
            },
        });
    }

    return (
        <Card className="w-[90%] md:w-[300px] lg:w-[400px] mx-auto">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
            <Button className="w-full" type="submit">Sign In</Button>
        </form>
        </Form>
            </CardContent>
            <CardFooter className='flex justify-center'>
                <p className='text-sm text-muted-foreground'>
                    Not an Admin? {' '}
                <Link href='/' className='text-primary hover:underline'>
                    Go Home
                </Link>
                </p>
            </CardFooter>
        </Card>
    )
}