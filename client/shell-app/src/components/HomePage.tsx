const HomePage = () => {
  return <div>
      <div>Home Page</div> <br />

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        COMP308 Project Group 3 
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Welcome to our innovative healthcare application designed to support nurse practitioners and patients during the critical transition period from hospital to home care. 
        <br />
        Our modern web app offers a comprehensive set of features tailored to streamline patient monitoring and promote well-being.
      </p>

      {/* Nurse Practitioners benefits */}
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Use for Nurse Practitioners:
      </h2>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-left">
        <li><b>Vital Signs Monitoring: </b>Easily record and track patients' vital signs including body temperature, heart rate, blood pressure, and respiratory rate.</li>
        <li><b>Access to Historical Data: </b>Retrieve vital information captured during previous clinical visits to aid in informed decision-making.</li>
        <li><b>Daily Motivational Tips: </b>Send personalized motivational tips to patients to encourage compliance and foster positivity.</li>
        <li><b>Medical Condition Assessment: </b>Leverage intelligent algorithms to generate a list of potential medical conditions based on symptoms, empowering timely intervention when necessary.</li>
      </ul>
      <br />
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        "This application has being supporting me in my daily tasks as a nurse practitioner. It has helped me to monitor my patients' health and provide timely interventions when necessary. I highly recommend it to my colleagues."
      </blockquote>
      <p className="mt-6 border-l-2 pl-6 font-semibold">
      - Nurse Practitioner, Toronto General Hospital
      </p>
      
      {/* Patient benefits */}
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Use for Patients:
      </h2>

      
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Our application is designed to empower patients in managing their health and well-being from the comfort of their homes. With a user-friendly interface and a wide range of features, our platform is the perfect companion for your healthcare journey.
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-left ">
        <li><b>Emergency Alert System: </b>Quickly create and dispatch emergency alerts to first responders, ensuring swift assistance during critical situations.</li>
        <li><b>Fitness Games Page: </b>Engage in fun and interactive fitness games designed to motivate and inspire regular exercise routines from the comfort of home.</li>
        <li><b>Daily Health Tracking: </b>Input daily health data as prescribed by the nurse practitioner, such as pulse rate, blood pressure, weight, temperature, and respiratory rate.</li>
        <li><b>Symptom Checklist: </b>Utilize a comprehensive checklist of common signs and symptoms to monitor health status and submit updates as needed.</li>
      </ul>
      <br />
      
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        "It's being a life-saver for me. I can easily track my health data and receive timely alerts when needed. I feel more secure knowing that help is just a click away."
      </blockquote>
      <p className="mt-6 border-l-2 pl-6 font-semibold">
      - James Smith, Patient (user since 2022)
      </p>

      <h3 className="mt-8 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Application
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Our platform is built with cutting-edge technology to provide a seamless and intuitive user experience for both nurse practitioners and patients alike. Join us in revolutionizing home healthcare management and enhancing patient outcomes.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        What are you waiting for? Sign up today and experience the benefits of our healthcare application for yourself!
      </p>

      <br /> <br />
      
  </div>
;

  
};

export default HomePage;
