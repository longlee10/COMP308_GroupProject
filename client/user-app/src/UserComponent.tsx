import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AuthForm from "./components/AuthForm";

const UserComponent = () => {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <>
      <Tabs value={activeTab} className="w-[400px] m-auto">
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
    </>
  );
};

export default UserComponent;
