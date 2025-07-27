import React from 'react';

const WalletSection = () => {
  return (
    <div className="max-w-lg mx-auto bg-white ">
      <div className="flex justify-center items-center mb-4 p-10">
      </div>

      <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 mb-3 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79V7a2 2 0 00-2-2H5a2 
              2 0 00-2 2v10a2 2 0 002 2h14a2 
              2 0 002-2v-2.21a1 1 0 
              00-.553-.894l-2.894-1.447a1 
              1 0 010-1.788l2.894-1.447A1 
              1 0 0021 12.79z"
          />
        </svg>
        <p className="text-base font-medium">No wallet transactions</p>
        <p className="text-sm">You haven't made any transactions yet.</p>
      </div>
    </div>
  );
};

export default WalletSection;
