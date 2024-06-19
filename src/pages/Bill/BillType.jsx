import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';

const BillType = () => {
  const [formData, setFormData] = useState({
    billId: '',
    billNumber: '',
    amount: '',
    pin: '',
    selectedAccount: '',
    billProvider: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedBillType, setSelectedBillType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showRecentPayments, setShowRecentPayments] = useState(false);
  const [recentPayments, setRecentPayments] = useState([]);
  const [dialog, setDialog] = useState({ open: false, message: '' });

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const token = localStorage.getItem('authorization');
        if (!token) throw new Error('Unauthorized: Token not found');
        const response = await axios.get('https://techbuzzers.somee.com/GetBankAccounts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBankAccounts(response.data);
      } catch (error) {
        setError('Error fetching bank accounts.');
      }
    };

    fetchBankAccounts();
  }, []);

  const fetchBillDetails = async (billType) => {
    try {
      const token = localStorage.getItem('authorization');
      if (!token) throw new Error('Unauthorized: Token not found');
      const response = await axios.get('https://techbuzzers.somee.com/getBillDetails', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const billDetails = response.data.find((bill) => bill.billType === billType);
      if (billDetails) {
        setFormData({
          ...formData,
          billId: billDetails.billId,
          billProvider: billDetails.billProviderName,
        });
      }
    } catch (error) {
      setError('Error fetching bill details.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('authorization');
      if (!token) throw new Error('Unauthorized: Token not found');
      const response = await axios.post('https://techbuzzers.somee.com/payBill', {
        billDetailsId: formData.billId,
        billNumber: formData.billNumber,
        amount: formData.amount,
        pin: formData.pin,
        useraccountId: formData.selectedAccount
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setDialog({ open: true, message: 'Bill payment was successful.' });
    } catch (error) {
      if (error.response && error.response.data === 'Invalid Pin') {
        setDialog({ open: true, message: 'Invalid Pin' });
      } else {
        setDialog({ open: true, message: 'Error submitting bill details.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBillTypeSelection = (billType) => {
    setSelectedBillType(billType);
    setShowForm(true);
    setShowRecentPayments(false);
    fetchBillDetails(billType);
  };

  const fetchRecentPayments = async () => {
    try {
      const token = localStorage.getItem('authorization');
      if (!token) throw new Error('Unauthorized: Token not found');
      const response = await axios.get('https://techbuzzers.somee.com/getRecentBillPayments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedPayments = response.data.sort((a, b) => new Date(b.transaction.timestamp) - new Date(a.transaction.timestamp));
      setRecentPayments(sortedPayments);
    } catch (error) {
      setError('Error fetching recent bill payments.');
    }
  };

  function formatTimestampToDate(timestamp) {
    let date = new Date(timestamp);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    let formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  const handleRecentPaymentsClick = () => {
    setShowRecentPayments(true);
    setShowForm(false);
    setSelectedBillType(null);
    fetchRecentPayments();
  };

  const closeDialog = () => {
    setDialog({ open: false, message: '' });
  };

  return (
    <div>
      <PageTitle title="Bill Payments" />
      <div className="p-8">
        <div className="mt-8">
          <div className='flex flex-col mb-4 md:flex-row md:items-center md:justify-between gap-4'>
            <h2 className="text-2xl font-bold mb-4">Types of Bills</h2>
            <button
              className="bg-black text-white py-2 px-4 rounded"
              onClick={handleRecentPaymentsClick}
            >
              Recent Bill Payments
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => handleBillTypeSelection('Electric Bill')}
              className="hover:bg-gray-100 py-4 rounded-lg text-center border border-gray-300 flex flex-col items-center justify-center cursor-pointer"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
              <span>Electricity Bill</span>
            </div>
            <div
              onClick={() => handleBillTypeSelection('Water Bill')}
              className="hover:bg-gray-100 py-4 rounded-lg text-center border border-gray-300 flex flex-col items-center justify-center cursor-pointer"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height={20} width={20}>
                <path d="M14.0250390625 3.6779609375c-1.080828125 -1.24825 -2.297296875 -2.3722734375 -3.6269140625 -3.35128125 -0.241109375 -0.16890624999999998 -0.5621406250000001 -0.16890624999999998 -0.8032578125000001 0 -1.3271640625 0.9794140625000001 -2.541265625 2.103421875 -3.61990625 3.35128125C3.5695625 6.4403671875 2.299921875 9.3523984375 2.299921875 12.099921875c0.001890625 5.9275234375 6.419796875 9.6301796875 11.5522421875 6.664781250000001 2.380453125 -1.3753671875000002 3.8470390625 -3.9155625 3.8479140625 -6.664781250000001 0 -2.7475234375 -1.269640625 -5.6595546875 -3.6750390625000002 -8.4219609375ZM10 18.399984375c-3.477828125 -0.003859375 -6.296203125 -2.822234375 -6.3000625 -6.3000625 0 -5.007671875000001 4.853671875 -9.187593750000001 6.3000625 -10.3251015625 1.446390625 1.1375078125 6.3000625 5.3156796875 6.3000625 10.3251015625 -0.003859375 3.477828125 -2.822234375 6.296203125 -6.3000625 6.3000625Zm4.890421875 -5.4828046875c-0.37175781249999995 2.0765390624999998 -1.9974218750000001 3.7018515625 -4.0740390625 4.0731640625 -0.038492187500000004 0.006171875 -0.077390625 0.009390625 -0.116375 0.009625 -0.5388671875 -0.000140625 -0.8755078125 -0.5835625 -0.605953125 -1.0501640625 0.104515625 -0.18092187499999998 0.284390625 -0.3056953125 0.490453125 -0.34021875 1.4498906249999999 -0.2441328125 2.6801484375 -1.4743906249999998 2.9260312500000003 -2.92690625 0.0902578125 -0.5314609375 0.7219921875 -0.76590625 1.1371171875 -0.422015625 0.19265625000000003 0.1596015625 0.28553125 0.40986718749999995 0.2436484375 0.6565156249999999Z" strokeWidth={1} />
            </svg>
              <span>Water Bill</span>
            </div>
            <div
              onClick={() => handleBillTypeSelection('Gas Bill')}
              className="hover:bg-gray-100 py-4 rounded-lg text-center border border-gray-300 flex flex-col items-center justify-center cursor-pointer"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height={20} width={20}>
                <path d="M19.187484375 4.895257812500001 17.495234375 3.2047578124999996c-0.3812421875 -0.3812421875 -1.0322265625 -0.2068125 -1.1717734375 0.31397656250000006 -0.0647578125 0.2416953125 0.0043437499999999995 0.4995859375 0.1812734375 0.6765234375L18.195234375 5.8875c0.1306015625 0.13075 0.20420312499999999 0.307828125 0.20475 0.492625V13.5c0 0.538859375 -0.583328125 0.875640625 -1.05 0.6062109375 -0.216578125 -0.1250390625 -0.35000000000000003 -0.35612499999999997 -0.35000000000000003 -0.6062109375V10c0 -1.159796875 -0.9401953125 -2.1 -2.0999921875 -2.1h-1.4000000000000001V3.7000078125c0 -1.159796875 -0.9402031249999999 -2.1 -2.1 -2.1H4.4c-1.159796875 0 -2.1 0.9402031249999999 -2.1 2.1v13.299984375000001H0.8999999999999999c-0.538859375 0 -0.8756484375 0.5833359375 -0.60621875 1.05 0.125046875 0.2165859375 0.35613281250000006 0.35000000000000003 0.60621875 0.35000000000000003h13.999992187500002c0.538859375 0 0.875640625 -0.583328125 0.6062109375 -1.05 -0.1250390625 -0.216578125 -0.35613281250000006 -0.35000000000000003 -0.6062109375 -0.35000000000000003h-1.4000000000000001V9.3h1.4000000000000001c0.38659375 0 0.6999921874999999 0.31339843749999996 0.6999921874999999 0.7000000000000001v3.5c0 1.616578125 1.75 2.6269375 3.15 1.8186484375 0.6497421875 -0.375125 1.05 -1.068390625 1.05 -1.8186484375V6.380125c0.0021249999999999997 -0.5568515625 -0.21839843750000001 -1.091453125 -0.6125 -1.484875ZM3.7 16.9999921875V3.7000078125c0 -0.38661718749999996 0.3133828125 -0.7000234375000001 0.7000000000000001 -0.7000000000000001h6.9999921875c0.3865859375 0.000015625 0.7000000000000001 0.31341406250000003 0.7000000000000001 0.7000000000000001v13.299984375000001ZM10.699992187500001 8.6c0 0.3866015625 -0.31339843749999996 0.7000000000000001 -0.7000000000000001 0.7000000000000001h-4.2c-0.538859375 0.0000234375 -0.875640625 -0.5832968749999999 -0.6062265625 -1.0499687500000001 0.1250390625 -0.2166015625 0.35613281250000006 -0.35000000000000003 0.6062265625 -0.35000000000000003h4.2c0.3866015625 -0.0000234375 0.7000000000000001 0.31339843749999996 0.7000000000000001 0.7000000000000001Z" strokeWidth={1} />
            </svg>
              <span>Gas Bill</span>
            </div>
          </div>
        </div>
        {showForm && (
          <div className="flex flex-col gap-2 rounded-md p-6">
            <div className="w-full md:w-1/1">
              <Card title={`Bill Details Form for ${selectedBillType}`}>
                <form onSubmit={handleSubmit} className="mt-8">
                  <div className="mb-4">
                    <label htmlFor="billId" className="block text-gray-700 font-semibold mb-2">
                      Bill ID
                    </label>
                    <input
                      type="text"
                      id="billId"
                      name="billId"
                      value={formData.billId}
                      onChange={handleChange}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter bill ID"
                      required
                      readOnly
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="billProvider" className="block text-gray-700 font-semibold mb-2">
                      Bill Provider
                    </label>
                    <input
                      type="text"
                      id="billProvider"
                      name="billProvider"
                      value={formData.billProvider}
                      onChange={handleChange}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter bill provider"
                      required
                      readOnly
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="billNumber" className="block text-gray-700 font-semibold mb-2">
                      Bill Number
                    </label>
                    <input
                      type="text"
                      id="billNumber"
                      name="billNumber"
                      value={formData.billNumber}
                      onChange={handleChange}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter bill number"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
                      Amount
                    </label>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter amount"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="selectedAccount" className="block text-gray-700 font-semibold mb-2">
                      Select Bank Account
                    </label>
                    <select
                      id="selectedAccount"
                      name="selectedAccount"
                      value={formData.selectedAccount}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">Select an account</option>
                      {bankAccounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.accountName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="pin" className="block text-gray-700 font-semibold mb-2">
                      PIN
                    </label>
                    <input
                      type="password"
                      id="pin"
                      name="pin"
                      value={formData.pin}
                      onChange={handleChange}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter PIN"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Button type="submit" title="Pay" loading={loading} loadingTitle={"Paying"}/>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        )}
        {showRecentPayments && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Recent Bill Payments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPayments.map((payment) => (
                <Card key={payment.billId} title="Paid">
                  <p>Bill ID: {payment.billDetailsId}</p>
                  <p>Bill Type: {payment.billType}</p>
                  <p>Bill Number: {payment.billNumber}</p>
                  <p>Amount: {payment.amount}</p>
                  <p>Paid On: {formatTimestampToDate(payment.transaction.timestamp)}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

{dialog.open && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {(dialog.message).includes("successful") ? "Success" : "Error"}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{dialog.message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeDialog}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}





    </div>
  );
};

export default BillType;
