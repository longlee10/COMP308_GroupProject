import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserData } from "@/types";
import { Link } from "react-router-dom";
import { useLogout } from "@/hooks";

function NavBar({ user }: { user: UserData }) {
  const navBarsItems = [
    { name: "Home", path: "/" },
    { name: "Vital Signs", path: "/vital-sign" },
    { name: "Alerts", path: "/alert" },
    { name: "Motivation Tips", path: "/motivation" },
    { name: "Symptoms", path: "/symptom" },
    { name: "Game", path: "/game" },
  ];

  const logout = useLogout();

  return (
    <NavigationMenu className="mb-5 p-3 flex justify-between">
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
        {user.currentUser ? (
          <>
            <NavigationMenuItem
              className={`${navigationMenuTriggerStyle()} cursor-pointer`}
              onClick={logout}
            >
              Logout
            </NavigationMenuItem>
            <NavigationMenuItem>
              {`${user?.currentUser.username} (${user?.currentUser.__typename})`}
            </NavigationMenuItem>
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
