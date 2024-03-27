import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { FormEvent, useRef } from "react";
import { VitalSignFormData } from "../entities/types";
import {
  useAddVitalSign,
  useGetVitalSignById,
  useGetVitalSigns,
  useUpdateVitalSign,
} from "../hooks/useVitalSign";

const VitalSignForm = () => {
  const { id } = useParams();
  const handleAdd = useAddVitalSign();
  const handleUpdate = useUpdateVitalSign();
  const data = useGetVitalSignById(id!);
  const { refetch } = useGetVitalSigns();

  const formData: VitalSignFormData = {
    temperature: useRef<HTMLInputElement>(null),
    bloodPressure: useRef<HTMLInputElement>(null),
    heartRate: useRef<HTMLInputElement>(null),
    respiratoryRate: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    id ? handleUpdate(id, formData) : handleAdd(formData);
    refetch();
  };

  return (
    <div>
      {id ? <h2>Edit Vital Sign</h2> : <h2>Add Vital Sign</h2>}
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Temperature</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter temperature"
            ref={formData.temperature!}
            defaultValue={data && data.vitalSign.temperature}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Blood Pressure</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter blood pressure"
            ref={formData.bloodPressure!}
            defaultValue={data && data.vitalSign.bloodPressure}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Heart Rate</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter heart rate"
            ref={formData.heartRate!}
            defaultValue={data && data.vitalSign.heartRate}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Respiratory Rate</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter respiratory rate"
            ref={formData.respiratoryRate!}
            defaultValue={data && data.vitalSign.respiratoryRate}
          />
        </Form.Group>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VitalSignForm;
