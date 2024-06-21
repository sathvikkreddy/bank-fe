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
    <div className="w-full p-2">
      <Link to={route}>
        <div className="w-full border dark:border-teal-300 rounded-lg p-5 hover:shadow-xl shadow-teal-100 dark:shadow-md dark:shadow-teal-600 hover:transition-all hover:border  hover:bg-teal-100 dark:hover:bg-c700 relative group">
          <div className="font-semibold flex justify-center mb-2 text-xl">
            {name}
          </div>
          <hr className="shadow-md group-hover:shadow-teal-300 border-black dark:border-teal-300"/>
          <br />
          <div className="relative group">
            <img
              src={image}
              alt={type}
              className="w-full h-48 md:h-48 lg:h-48 object-scale-down shadow-md bg-white dark:shadow-teal-600 dark:bg-c100 rounded-lg mb-4"
            />
          </div>

          <div className="flex flex-col justify-center items-center mt-3">
            <div className="text-md font-light mb-3">
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
          <div className="flex justify-center pt-1 border shadow-md text-white font-bold dark:shadow-teal-300 dark:border-teal-300 absolute bottom-0 left-0 right-0 bg-c300 text-center py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click To Apply Or Get Details
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LoanCard;
