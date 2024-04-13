import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyTipFormData } from "@/entities/types";
import {
  useAddTip,
  useEditTip,
  useGetTip,
  useGetTipById,
} from "@/hooks/useTip";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const AlertForm = () => {
  const { id } = useParams();
  const addTip = useAddTip();
  const editTip = useEditTip();
  const { refetch } = useGetTip();
  const { data } = useGetTipById(id!);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<DailyTipFormData>({
    title: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      id ? await editTip(id, formData) : await addTip(formData);
    } catch (error) {
      console.error("Error creating alert:", error);
    }
    navigate("/motivation");
    refetch();
  };

  useEffect(() => {
    if (data) {
      const { dailyTip } = data;
      setFormData({
        title: dailyTip.title,
        description: dailyTip.description,
      });
    }
  }, [data]);

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
                defaultValue={data?.dailyTip.title}
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
                defaultValue={data?.dailyTip.description}
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
