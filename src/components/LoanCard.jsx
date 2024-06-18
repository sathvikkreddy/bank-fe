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
        <div className="w-full border rounded-lg p-5 hover:shadow-xl hover:transition-all hover:border hover:bg-gray-50 relative group">
          <div className="font-semibold flex justify-center mb-2 text-xl">
            {name}
          </div>
          <hr />
          <br />
          <div className="relative group"><img
            src={image}
            alt={type}
            className="w-full h-48 md:h-48 lg:h-48 object-scale-down rounded-lg mb-4 group-hover:bg-white group-hover:ease-in-out group-hover:shadow-md"
          /></div>
          
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
          <div className="flex justify-center pt-1 text-white font-semibold absolute bottom-0 left-0 right-0 bg-black text-center py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click To Apply Or Get Details
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LoanCard;
