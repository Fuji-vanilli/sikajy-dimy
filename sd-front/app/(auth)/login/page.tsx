import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [githubPending, startGithubTransition] = useTransition();
  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: ()=> {
            toast.success("Successfully signed in with Github, you will be redirected...");
          },
          onError: (error) => {
            toast.error(`Failed to sign in with Github: ${error.error}`);
          }
        }
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Login to your Github or Email account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button 
          onClick={signInWithGithub} className="w-full" variant={"outline"}
          disabled={githubPending}
        >
          <GithubIcon className="size-4" />
          Sign in with Github
          </Button>
          <div className="relative text-center text-sm after:absolute 
            after:inset-0 after:top-1/2 after:z-0 
            after:flex after:items-center
            after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="x@example.com" />
            </div>
            <Button>Continue with email</Button>          </div>
      </CardContent>
    </Card>
  );
}
