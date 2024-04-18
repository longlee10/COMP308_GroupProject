const Alert = ({ message }: { message: string }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-3"
      role="alert"
    >
      <span className="font-medium">
        {message && "An unknown error occurred. Please try again."}
      </span>
    </div>
  );
};

export default Alert;
