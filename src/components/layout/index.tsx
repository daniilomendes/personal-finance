import { Outlet } from "react-router-dom";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { BodyContent, Container, Content, NavbarContent } from "./styles";

const Layout = () => {
  return (
    <AuthMiddleware>
      <Container>
        <Sidebar />

        <Content>
          <NavbarContent>
            <Navbar />
          </NavbarContent>

          <BodyContent>
            <Outlet />
          </BodyContent>
        </Content>
      </Container>
    </AuthMiddleware>
  );
};

export default Layout;
