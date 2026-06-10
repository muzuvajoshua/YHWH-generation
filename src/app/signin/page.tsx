import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/signin-form";
import { getSession } from "@/lib/auth/session";
import { devGuestSignIn } from "@/lib/auth/actions";

export default async function SignInPage() {
  const session = await getSession();
  if (session) redirect("/app");

  return (
    <AuthShell
      eyebrow="Sign in"
      title="Welcome back."
      subtitle="Continue to your workspace. Multi-factor and SSO available on Team and Enterprise."
      footerHint={
        <div className="space-y-3">
          <form action={devGuestSignIn}>
            <button
              type="submit"
              className="text-violet-300 hover:text-violet-200 underline underline-offset-4"
            >
              Skip — explore as guest
            </button>
          </form>
          <p>
            New to Dashboard OS?{" "}
            <Link href="/signup" className="text-zinc-200 hover:text-zinc-50">
              Create a workspace
            </Link>
          </p>
        </div>
      }
    >
      <SignInForm />
    </AuthShell>
  );
}
