'use client'

import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formSchema } from "@/lib/auth-schema"
import { authClient } from "@/lib/auth-client"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })
    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { name, email, password } = values;
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: "/sign-in",
        }, {
            onRequest: () => {
            toast({
                title: "Please wait...",
            })
            },
            onSuccess: () => {
                form.reset()
                toast({
                    title: "Successfully Signed Up",
                })
                router.push("/sign-in");
            },
            onError: (ctx) => {
                toast({ title: ctx.error.message, variant: 'destructive' });
                form.setError('email', {
                    type: 'manual',
                    message: ctx.error.message
                })
            },
        });
    }
        

    return (
        <div>
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Justin Lee" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
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
            <Button className="w-full" type="submit">Submit</Button>
        </form>
        </Form>
            </CardContent>
        </Card>
        </div>
    )
}