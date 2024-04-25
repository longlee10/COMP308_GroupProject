import React, { useState, useEffect } from "react";
import { AlertFormData } from "@/entities/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  useAddAlert,
  useGetAlerts,
  useGetAlert,
  useUpdateAlert,
} from "@/hooks/useAlert";
import { useNavigate, useParams } from "react-router-dom";

const AlertForm = () => {
  const [formData, setFormData] = useState<AlertFormData>({
    patientName: "",
    responderName: "",
    responderPhone: "",
    responderAddress: "",
    message: "",
  });

  const { id } = useParams();
  const addAlert = useAddAlert();
  const { refetch } = useGetAlerts();
  const { data } = useGetAlert(id!);
  const updateAlert = useUpdateAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) setFormData(data.alert);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      id ? await updateAlert(id, formData) : await addAlert(formData);
    } catch (error) {
      console.error("Error creating alert:", error);
    }
    navigate("/alert");
    refetch();
  };

  return (
    <div className="container mx-auto mt-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Alert Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="space-y-1">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name..."
                type="text"
                defaultValue={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responderName">Responder Name</Label>
              <Input
                id="responderName"
                placeholder="Enter responder name..."
                type="text"
                defaultValue={formData.responderName}
                onChange={(e) =>
                  setFormData({ ...formData, responderName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responderPhone">Responder Phone</Label>
              <Input
                id="responderPhone"
                placeholder="Enter responder phone..."
                defaultValue={formData.responderPhone}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, responderPhone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responderAddress">Responder Address</Label>
              <Input
                id="responderAddress"
                placeholder="Enter responder address..."
                defaultValue={formData.responderAddress}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, responderAddress: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message..."
                defaultValue={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
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
