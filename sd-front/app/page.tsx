"use client";
 
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();
  async function signOut() {
    await authClient.signOut();
  }

  return (
    <div>
      <ThemeToggle />
      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      ): <Button>Login</Button>}
    </div>
  );
}
