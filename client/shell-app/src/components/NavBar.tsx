import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

function NavBar() {
  const navBars = [
    { name: "Home", path: "/" },
    { name: "Vital Signs", path: "/vital-sign" },
    { name: "Alerts", path: "/alert" },
    { name: "Motivation Tips", path: "/motivation" },
    { name: "Symptoms", path: "/symptom" },
    { name: "Game", path: "/game" },
  ];
  return (
    <div className="mb-5 p-3">
      <NavigationMenu>
        <NavigationMenuList>
          {navBars.map((navBar, index) => {
            return (
              <NavigationMenuItem key={index}>
                <Link to={navBar.path} className={navigationMenuTriggerStyle()}>
                  {navBar.name}
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    // <Navbar expand="lg" className="bg-body-tertiary mb-5">
    //   <Container>
    //     <Navbar.Brand>Vital Hub</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto gap-3">
    //         <Nav.Item>
    //           <Link to="/vital-sign">Vital Sign</Link>
    //         </Nav.Item>
    //         <Nav.Item>
    //           <Link to="/alert">Alert</Link>
    //         </Nav.Item>
    //         <Nav.Item>
    //           <Link to="/motivation">Motivation</Link>
    //         </Nav.Item>
    //         <Nav.Item>
    //           <Link to="/symptom">Symptom</Link>
    //         </Nav.Item>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
}

export default NavBar;
