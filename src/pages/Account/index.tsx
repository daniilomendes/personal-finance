import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useAuth } from "../../hooks/auth";
import { useTheme } from "styled-components";
import { deleteUser, updateUser } from "../../services/requests";
import { setUser } from "../../redux/slices/authSlice";
import {
  Body,
  Container,
  Footer,
  Header,
  HeaderDeleteAccount,
  HeaderInfo,
  HeaderSubtitle,
  HeaderTitle,
  Loading,
} from "./styles";
import Button from "../../components/Button";
import { ScaleLoader } from "react-spinners";
import TextInput from "../../components/TextInput";
import Alert from "../../components/Alert";

const Account = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [nameValue, setNomeValue] = useState(user?.name as string);
  const [emailValue, setEmailValue] = useState(user?.email as string);
  const [showAlert, setShowAlert] = useState({
    type: "error",
    message: "",
    show: false,
  });

  const { handleSignOut } = useAuth();
  const theme = useTheme();

  const handleUpdateAccount = async () => {
    setLoadingRequest(true);
    const request = await updateUser(nameValue, emailValue);
    setLoadingRequest(false);

    if (request.error) {
      setShowAlert({ type: "error", message: request.error, show: true });
    }

    if (request.data) {
      dispatch(setUser(request.data.user));
      setShowAlert({
        type: "success",
        message: "Informações alteradas com sucesso!",
        show: true,
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Tem certeza que deseja excluir sua conta?")) {
      setLoadingRequest(true);

      // Delete user account and sign out
      await deleteUser();
      handleSignOut();

      setLoadingRequest(false);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Minha conta</HeaderTitle>
          <HeaderSubtitle>
            Edite os dados da sua conta, e depois clique em salvar!
          </HeaderSubtitle>
        </HeaderInfo>

        <HeaderDeleteAccount>
          <Button onClick={handleDeleteAccount} width="120px" size="md">
            Excluir conta
          </Button>
        </HeaderDeleteAccount>
      </Header>

      <Alert
        type={showAlert.type}
        title={showAlert.message}
        show={showAlert.show}
        setShow={(show) => setShowAlert({ ...showAlert, show })}
      />

      {loadingRequest && (
        <Loading>
          <ScaleLoader color={theme.COLORS.primary} />
        </Loading>
      )}

      {!loadingRequest && (
        <>
          <Body>
            <TextInput
              label="Seu nome"
              placeholder="Danilo Mendes Miranda"
              value={nameValue}
              onChange={(e) => setNomeValue(e.target.value)}
              borderRadius="sm"
            />

            <TextInput
              label="Seu email"
              placeholder="danilo@gmail.com"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              borderRadius="sm"
            />
          </Body>

          <Footer>
            <Button onClick={handleUpdateAccount} size="md" width="110px">
              Salvar
            </Button>
          </Footer>
        </>
      )}
    </Container>
  );
};

export default Account;
