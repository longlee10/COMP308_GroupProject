import React, { useState } from "react";
import { Alert } from "@/entities/types";
import { useMutation } from "@apollo/client"; 
import { ADD_ALERT } from "../queries/alertQueries"; 
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const AlertForm = () => {
  const [formData, setFormData] = useState<Alert>({
    id: "",
    patientName: "",
    responderName: "",
    responderPhone: "",
    responderAddress: "",
    message: "",
  });

  const [addAlertMutation] = useMutation(ADD_ALERT);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addAlertMutation({ variables: formData });
      console.log("Alert created:", response.data?.createAlert);
      setFormData({
        id: "",
        patientName: "",
        responderName: "",
        responderPhone: "",
        responderAddress: "",
        message: "",
      });
    } catch (error) {
      console.error("Error creating alert:", error);
    }
  };  

  return (
    <div className="container mx-auto mt-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Alert Form</CardTitle>
          <CardDescription>Fill out the form below:</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
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
            </div>
            <button
              type="submit"
              className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertForm;
