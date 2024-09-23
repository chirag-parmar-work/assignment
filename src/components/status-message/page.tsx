import React from "react";

export const CheckCircle = ({
  height = 16,
  width = 16,
}: {
  height?: number;
  width?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z"
        fill="#38C793"
      />
    </svg>
  );
};
export const AlertCircle = ({
  height = 20,
  width = 21,
}: {
  height?: number;
  width?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 18C5.85775 18 2.5 14.6423 2.5 10.5C2.5 6.35775 5.85775 3 10 3C14.1423 3 17.5 6.35775 17.5 10.5C17.5 14.6423 14.1423 18 10 18ZM9.25 12.75V14.25H10.75V12.75H9.25ZM9.25 6.75V11.25H10.75V6.75H9.25Z"
        fill="#DF1C41"
      />
    </svg>
  );
};

export const InfoIcon = ({
  height = 16,
  width = 16,
}: {
  height?: number;
  width?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 7.4V11H8.6V7.4H7.4ZM7.4 5V6.2H8.6V5H7.4Z"
        fill="#4159CF"
      />
    </svg>
  );
};

const StatusMessage = ({ status }: { status: string }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "checking":
        return {
          icon: InfoIcon,
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          borderColor: "border-blue-100",
          message: "Checking connection...",
        };
      case "error":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-red-100",
        };
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-100",
          message: "Surface Tag installed successfully.",
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();

  if (!config) return null;

  const { icon: Icon, bgColor, textColor, borderColor, message } = config;

  return (
    <div className={`p-2 ${bgColor} ${borderColor} mb-4 rounded-md border`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">{Icon && <Icon />}</div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${textColor}`}>{message}</p>
          {status === "error" && (
            <ul className="mt-2 list-inside list-disc text-sm text-red-700">
              <li>
                Recheck the code snippet to ensure it's correctly placed before
                the closing &lt;/head&gt; tag.
              </li>
              <li>
                Ensure there are no blockers (like ad blockers) preventing the
                script from running.
              </li>
              <li>Try again once you've made the corrections.</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusMessage;
