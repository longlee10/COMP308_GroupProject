import { VitalSign } from "@/entities/types";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = ({ vital_signs }: { vital_signs: VitalSign[] | undefined }) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={vital_signs}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      className="m-auto mt-5"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="temperature"
        fill="#8884d8"
        activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
      <Bar
        dataKey="bloodPressure"
        fill="#82ca9d"
        activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
      <Bar
        dataKey="heartRate"
        fill="#ff7300"
        activeBar={<Rectangle fill="red" stroke="orange" />}
      />
      <Bar
        dataKey="respiratoryRate"
        fill="#ff0000"
        activeBar={<Rectangle fill="red" stroke="red" />}
      />
      <Bar
        dataKey="oxygenSaturation"
        fill="#00ff00"
        activeBar={<Rectangle fill="red" stroke="cyan" />}
      />
    </BarChart>
  );
};

export default Chart;
