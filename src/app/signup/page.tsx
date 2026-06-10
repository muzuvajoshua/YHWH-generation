import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/signup-form";
import { getSession } from "@/lib/auth/session";

export default async function SignUpPage() {
  const session = await getSession();
  if (session) redirect("/app");

  return (
    <AuthShell
      side="right"
      eyebrow="Get started"
      title="Build your first dashboard in under a minute."
      subtitle="Free for individuals. No credit card. Bring your data, or use the sample dataset."
      footerHint={
        <p>
          Already have a workspace?{" "}
          <Link href="/signin" className="text-zinc-200 hover:text-zinc-50">
            Sign in
          </Link>
        </p>
      }
    >
      <SignUpForm />
    </AuthShell>
  );
}
