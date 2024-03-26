import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { FormEvent, useRef } from "react";
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

  let temperature = useRef<HTMLInputElement>(null);
  let bloodPressure = useRef<HTMLInputElement>(null);
  let heartRate = useRef<HTMLInputElement>(null);
  let respiratoryRate = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    id
      ? handleUpdate(id, temperature, bloodPressure, heartRate, respiratoryRate)
      : handleAdd(
          temperature,
          bloodPressure,
          heartRate,
          respiratoryRate,
          refetch
        );
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
            ref={temperature!}
            defaultValue={data && data.vitalSign.temperature.toString()}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Blood Pressure</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter blood pressure"
            ref={bloodPressure!}
            defaultValue={data && data.vitalSign.bloodPressure}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Heart Rate</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter heart rate"
            ref={heartRate!}
            defaultValue={data && data.vitalSign.heartRate}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Respiratory Rate</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter respiratory rate"
            ref={respiratoryRate!}
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
