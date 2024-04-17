import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AuthForm from "./components/AuthForm";
const signin = "https://i.ibb.co/23dp0Py/signin.png";

const UserComponent = () => {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <div className="mt-4 flex justify-center gap-28">
      <img src={signin} alt="" />
      <Tabs value={activeTab} className="w-[400px] mt-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin" onClick={() => setActiveTab("signin")}>
            Sign In
          </TabsTrigger>
          <TabsTrigger value="signup" onClick={() => setActiveTab("signup")}>
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <AuthForm type="signin" />
        </TabsContent>
        <TabsContent value="signup">
          <AuthForm type="signup" setActiveTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserComponent;
