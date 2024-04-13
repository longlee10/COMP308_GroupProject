import React, { useState } from "react";
import { DailyTipFormData } from "@/entities/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAddTip, useGetTip } from "@/hooks/useTip";
import { useNavigate } from "react-router-dom";
import { Textarea } from "./ui/textarea";

const AlertForm = () => {
  const [formData, setFormData] = useState<DailyTipFormData>({
    title: "",
    description: "",
  });

  const addTip = useAddTip();
  const { refetch } = useGetTip();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addTip(formData);
    } catch (error) {
      console.error("Error creating alert:", error);
    }
    navigate("/motivation");
    refetch();
  };

  return (
    <div className="container mx-auto mt-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Tip Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter title..."
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description..."
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="mt-3 m-auto">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertForm;
