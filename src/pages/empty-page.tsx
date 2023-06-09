import { CenteredLayout } from "../shared/layouts/centered-layout";

interface Props {
  isLoading?: boolean;
}

const EmptyPage = ({ isLoading }: Props) => (
  <CenteredLayout isLoading={isLoading}>{null}</CenteredLayout>
);

export default EmptyPage;
