import { useNavigate } from "react-router-dom";

export default function Appbar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen justify-between border-r-2">
      <div className="flex flex-col px-4 gap-8 sticky top-0 z-50">
        <div
          className="flex text-lg font-thin bg-gray-100 p-3 mt-3 cursor-pointer rounded-md"
          onClick={() => {
            navigate("/");
          }}
        >
          The Bank App
        </div>
        <div
          className="flex items-center gap-2 text-lg cursor-pointer"
          onClick={() => {
            navigate("/transfer");
          }}
        >
          <TransferIcon className="w-4 h-4" />
          <span>Transfer</span>
        </div>
        <div
          className="flex items-center gap-2 text-lg cursor-pointer"
          onClick={() => {
            navigate("/loan");
          }}
        >
          <LoanIcon className="w-4 h-4" />
          <span>Loan</span>
        </div>
        <div
          className="flex items-center gap-2 text-lg cursor-pointer"
          onClick={() => {
            navigate("/insurance");
          }}
        >
          <InsuranceIcon className="w-4 h-4" />
          <span>Insurance</span>
        </div>
        <div
          className="flex items-center gap-2 text-lg cursor-pointer"
          onClick={() => {
            navigate("/transactions");
          }}
        >
          <TransactionsIcon className="w-4 h-4" />
          <span>Transactions</span>
        </div>
        <div
          className="flex items-center gap-2 text-lg cursor-pointer"
          onClick={() => {
            navigate("/bills");
          }}
        >
          <BillsIcon className="w-4 h-4" />
          <span>Bills</span>
        </div>
      </div>
      <div className="flex p-4">
        <div
          className="rounded-full cursor-pointer flex items-center pr-2"
          size="icon"
          variant="ghost"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <ProfileIcon className="w-5 h-5" />
        </div>
        <div className="text-lg">Profile</div>
      </div>
    </div>
  );
}

function ProfileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}

function TransferIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  );
}

function TransactionsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

function BillsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
      />
    </svg>
  );
}

function InsuranceIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12a10.06 10.06 1 0 0-20 0Z" />
      <path d="M12 12v8a2 2 0 0 0 4 0" />
      <path d="M12 2v1" />
    </svg>
  );
}

function LoanIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}
