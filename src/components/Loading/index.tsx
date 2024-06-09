import { HashLoader } from "react-spinners";
import { Container, Label } from "./style";
import { useTheme } from "styled-components";

const Loading = () => {
  const theme = useTheme();

  return (
    <Container>
      <HashLoader color={theme.COLORS.primary} />
      <Label>Por favor aguarde...</Label>
    </Container>
  );
};
export default Loading;
