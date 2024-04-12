import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const navBarsItems = [
    { name: "Home", path: "/" },
    { name: "Vital Signs", path: "/vital-sign" },
    { name: "Alerts", path: "/alert" },
    { name: "Motivation Tips", path: "/motivation" },
    { name: "Symptoms", path: "/symptom" },
    { name: "Game", path: "/game" },
  ];
  return (
    <NavigationMenu className="mb-10 p-3 flex justify-between">
      <NavigationMenuList>
        {navBarsItems.map((navBar, index) => {
          return (
            <NavigationMenuItem key={index}>
              <Link to={navBar.path} className={navigationMenuTriggerStyle()}>
                {navBar.name}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <NavigationMenuList>
        {isLoggedIn ? (
          <>
            <NavigationMenuItem>
              <Link to="#" className={navigationMenuTriggerStyle()}>
                Logout
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>USERNAME</NavigationMenuItem>
          </>
        ) : (
          <NavigationMenuItem>
            <Link to="/auth" className={navigationMenuTriggerStyle()}>
              Login or Register
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavBar;
