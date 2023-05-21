import Image from "next/image";

import { Avatar as CkAvatar } from "connectkit";
import { useAccount } from "wagmi";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { NEXT_PUBLIC_MW_URL } from "../shared/core/envs";
import { useRouter } from "next/router";

import { Button, Text } from "../shared/components";
import { TextInput } from "@mantine/core";

import { useIsMounted } from "../shared/hooks";

import { CenteredLayout } from "../shared/layouts/centered-layout";

import EmptyPage from "./empty-page";

interface OrgFormData {
  organization: string;
  wallet: string;
}

const HandleOauthPage = () => {
  const { push } = useRouter();

  const isMounted = useIsMounted();
  const { address } = useAccount();

  const form = useForm<OrgFormData>({
    initialValues: {
      organization: "",
      wallet: address as string,
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (orgFormData: OrgFormData) => {
      console.log("orgFormData =", orgFormData);
      const res = await fetch(`${NEXT_PUBLIC_MW_URL}/check-github-membership`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...orgFormData }),
      });
      const resData = await res.json();
      console.log("resData =", resData);
      push("/verification-complete", undefined, { shallow: true });
    },
  });

  const onSubmit = form.onSubmit((values) => {
    //
    mutate({
      ...values,
    });
  });

  if (!isMounted) return <EmptyPage isLoading />;

  return (
    <CenteredLayout>
      <div className="flex flex-col space-y-6 rounded-3xl bg-gradient-to-r from-[#141317] to-black/60 p-8">
        <hr className="border-t border-white/10" />

        <Text size="lg" fw="bold">
          Verify github organization membership
        </Text>

        <div className="w-72">
          <Text color="dimmed">
            You must verify your github organization membership to continue.
          </Text>
        </div>

        {address && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <CkAvatar address={address} name={address} size={24} />
              <Text size="lg">
                {`${address.slice(0, 4)}...${address.slice(-4)}`}
              </Text>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <TextInput
            size="sm"
            radius="md"
            placeholder="Your organization's name"
            {...form.getInputProps("organization")}
          />

          <hr className="border-t border-white/10 p-4" />

          <div className="flex justify-center">
            <Button
              variant="primary"
              type="submit"
              textProps={{ fw: "semibold", size: "sm" }}
            >
              Verify my membership
            </Button>
          </div>
        </form>
      </div>
    </CenteredLayout>
  );
};

export default HandleOauthPage;
