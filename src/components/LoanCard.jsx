import { Link } from "react-router-dom";
const LoanCard = ({
  type,
  name,
  image,
  ir2,
  msg1,
  msg2,
  msg3,
  msg4,
  img1,
  img2,
  img3,
  img4,
  interestRate,
  route,
}) => {
  return (

    <>
    <div className="w-full md:w-1/2 lg:w-1/3 p-2 pl-3">
      <Link to={route}>
        <div className="w-full border border-gray-200 rounded-lg p-5 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group">
          <div className="font-semibold flex justify-center mb-2 text-xl">
            {name}
          </div>
          <img
            src={image}
            alt={type}
            className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-lg mb-4 transition-transform duration-300 hover:translate-y-1 group-hover:shadow-md"
          />
          <div className="flex flex-col justify-center items-center mt-3">
            <div className="text-md font-light text-gray-500 mb-3">
              <em>Interest Rate: </em> {interestRate}% to {ir2}%
            </div>
            <div className="flex flex-col items-start w-full space-y-2">
              <div className="flex items-center">
                <span className="ml-2 w-5 h-5">{img1}</span>
                <span className="ml-3 text-md">{msg1}</span>
              </div>
              <div className="flex items-center">
                <span className="ml-2 w-5 h-5">{img2}</span>
                <span className="ml-3 text-md">{msg2}</span>
              </div>
              <div className="flex items-center">
                <span className="ml-2 w-5 h-5">{img3}</span>
                <span className="ml-3 text-md">{msg3}</span>
              </div>
              <div className="flex items-center">
                <span className="ml-2 w-5 h-5">{img4}</span>
                <span className="ml-3 text-md">{msg4}</span>
              </div>
              <div className="h-3" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-blue-200 text-center py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to apply and get details
          </div>
        </div>
      </Link>
      {/* <div className="mt-2 flex justify-between">
        <Link to={`/LoanDetails/${loanId}`} className="text-blue-500">View Details</Link>
        <Link to={`/PayEMI/${loanId}`} className="text-blue-500">Pay EMI</Link>
      </div> */}
    </div>
    </>
  );
};

export default LoanCard;
