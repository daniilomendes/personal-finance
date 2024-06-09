import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  CardHearder,
  CardSubTitle,
  CardTitle,
  Container,
  Link,
  Wrapper,
} from "./styles";
import Alert from "../../components/Alert";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

type Props = {
  type: "signin" | "signup";
};

const Auth = ({ type }: Props) => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, SetEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showAlert, setShowAlert] = useState({
    type: "error",
    message: "",
    show: false,
  });

  const { handleSignIn, handleSignUp } = useAuth();

  const navigate = useNavigate();

  const handleOnClick = async () => {
    const [name, email, password] = [nameInput, emailInput, passwordInput];

    if ((type == "signup" && !name) || !email || !password) {
      setShowAlert({
        type: "error",
        message: "Preencha todos os campos!",
        show: true,
      });
      return;
    }

    const request = await (type == "signin"
      ? handleSignIn({ email, password })
      : handleSignUp({ name, email, password }));

    if (request != true) {
      setShowAlert({
        type: "error",
        message: request,
        show: true,
      });
      return;
    }

    // Redirect user after authentication
    navigate("/");
  };

  useEffect(() => {
    setShowAlert({ type: "error", message: "", show: false });
  }, [type]);

  return (
    <Wrapper>
      <Container>
        <Alert
          type={showAlert.type}
          show={showAlert.show}
          setShow={(show) => setShowAlert({ ...showAlert, show })}
          title={showAlert.message}
        />

        <Card>
          <CardHearder>
            <CardTitle>
              {type == "signin" ? "Entre na sua contar!" : "Crie uma conta!"}
            </CardTitle>
            <CardSubTitle>Insira as informações necessárias!</CardSubTitle>
          </CardHearder>

          <CardBody>
            {type == "signup" && (
              <TextInput
                value={nameInput}
                placeholder="Digite seu nome"
                onChange={(e) => setNameInput(e.target.value)}
                borderRadius="sm"
              />
            )}

            <TextInput
              value={emailInput}
              placeholder="Digite seu email"
              onChange={(e) => SetEmailInput(e.target.value)}
              borderRadius="sm"
            />

            <TextInput
              value={passwordInput}
              placeholder="Digite sua senha"
              onChange={(e) => setPasswordInput(e.target.value)}
              borderRadius="sm"
            />
          </CardBody>

          <CardFooter>
            <Button onClick={handleOnClick} size="md">
              {type == "signin" ? "Entrar" : "Registrar-se"}
            </Button>

            {type == "signin" ? (
              <Link to="/signup">Não tem uma conta? Registrar-se</Link>
            ) : (
              <Link to="/signin">Possuí uma conta? Entrar</Link>
            )}
          </CardFooter>
        </Card>
      </Container>
    </Wrapper>
  );
};
export default Auth;
