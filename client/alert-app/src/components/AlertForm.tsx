import React, { useState } from "react";
import { AlertFormData } from "@/entities/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useAddAlert, useGetAlerts } from "@/hooks/useAlert";
import { useNavigate } from "react-router-dom";

const AlertForm = () => {
  const [formData, setFormData] = useState<AlertFormData>({
    patientName: "",
    responderName: "",
    responderPhone: "",
    responderAddress: "",
    message: "",
  });

  const addAlert = useAddAlert();
  const { refetch } = useGetAlerts();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addAlert(formData);
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
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            {/* <div className="flex flex-col space-y-4">
              <label>
                Patient Name:
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Responder Name:
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  type="text"
                  name="responderName"
                  value={formData.responderName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Responder Phone:
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  type="text"
                  name="responderPhone"
                  value={formData.responderPhone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Responder Address:
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  type="text"
                  name="responderAddress"
                  value={formData.responderAddress}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Message:
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div> */}
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
