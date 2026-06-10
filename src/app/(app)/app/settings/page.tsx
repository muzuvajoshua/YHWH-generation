import { Settings } from "lucide-react";
import {
  Container,
  PageHeader,
} from "@/components/ui/page-header";
import { getSession } from "@/lib/auth/session";
import { signOut } from "@/lib/auth/actions";
import { SettingsForm } from "@/components/settings/settings-form";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const session = await getSession();

  return (
    <Container size="lg" className="py-6 lg:py-8 space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Workspace settings"
        description="Manage your profile, AI provider keys, appearance and notifications."
        icon={<Settings className="h-4 w-4" />}
        actions={
          <form action={signOut}>
            <Button type="submit" variant="ghost" size="sm">
              Sign out
            </Button>
          </form>
        }
      />

      <SettingsForm
        initialName={session?.name ?? ""}
        initialEmail={session?.email ?? ""}
      />
    </Container>
  );
}
