import { StyledContainer, StyledContent } from "./styled";

type Props = {
  navigation: React.ReactNode;
  footer: React.ReactNode;
  loader?: React.ReactNode;
  empty?: React.ReactNode;
  children: React.ReactNode;
};
export const Layout: React.FC<Props> = ({
  navigation,
  footer,
  loader,
  empty,
  children,
}) => {
  return (
    <StyledContainer overflow={loader ? "hidden" : "auto"}>
      {navigation}
      {empty}
      {loader}

      <StyledContent>{children}</StyledContent>

      {!loader ? footer : null}
    </StyledContainer>
  );
};
