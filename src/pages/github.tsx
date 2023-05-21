import { useRouter } from "next/router";

import { Text } from "../shared/components";
import { NEXT_PUBLIC_MW_URL } from "../shared/core/envs";
import { useIsMounted } from "../shared/hooks";

import { PickRoleButton, PickRoleSection } from "../shared/components";

import EmptyPage from "./empty-page";

const PickRolePage = () => {
  const { push } = useRouter();
  const isMounted = useIsMounted();

  if (!isMounted) return <EmptyPage isLoading />;

  const onClickDevGithub = () => {
    push(`${NEXT_PUBLIC_MW_URL}/trigger-dev-github-oauth`);
  };

  return (
    <div className="w-full">
      <div className="flex h-screen [&>*]:w-full">
        <PickRoleSection className="bg-gradient-to-l from-primary to-secondary">
          <Text size="lg" fw="bold">
            Developer
          </Text>
          <div className="flex w-72 flex-col gap-y-6">
            <Text color="dimmed" size="sm">
              To retrieve your organization membership we need to validate your
              Github account(s).
            </Text>
            <Text color="dimmed" size="sm">
              We will then verify you own the the account, and will inspect your
              organization memberships.
            </Text>
          </div>

          <PickRoleButton
            text="Connect with Github"
            icon="github"
            onClick={onClickDevGithub}
          />
          <hr className="border-t border-white/10" />
        </PickRoleSection>
      </div>
    </div>
  );
};

export default PickRolePage;
