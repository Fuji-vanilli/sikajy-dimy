import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function handleSingOut() {
    const router = useRouter();
    const signOut = async function signOut() {
        await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/");
                toast.success("Successfully signed out!");
            },
            onError: ()=> {
                toast.error("Error to sign out!!!");
            }
        }
        });
    }

    return signOut;
}