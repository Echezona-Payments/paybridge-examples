import { useState } from "react";
import PayBridgePayPop from "paybridge-pop";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const initializePayment = () => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const requestParams = {
      amount: "100.00",
      transactionId: `${Math.floor(Math.random() * 1000000)}`,
      email: "sample@mail.com",
      publicKey: "public key goes here",
      currency: "NGN",
      mode: "Live",
      productId: "[]",
      applyConviniencyCharge: true,
      productDescription: "MTN",
      bodyColor: "#0000",
      buttonColor: "#0000",
      footerText: "Powered by Echezona Ltd",
      footerLink: "http://paybridge.africa",
      footerLogo: "http://paybridge.africa/logo.png",
      metadata: [
        {
          name: "sample",
          value: "test",
        },
      ],
    };
    try {
      const payPop = new PayBridgePayPop();
      payPop.newTransaction({
        onSuccess: (transaction) => {
          // Payment complete! transactionId: transaction.transactionId
          console.log(transaction);
          setSuccess(`Payment (${transaction.transactionId} was succesful!!)`);
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
        },
        onError: (error) => {
          // Payment failed! transactionId: transaction.transactionId
          console.error(error);
          setError(`Payment failed! Error: (${error.message})`);
          setTimeout(() => {
            setError(null);
          }, 4000);
        },
        onCancel: () => {
          // user closed the popup
          setError("User cancelled the transaction");
          setTimeout(() => {
            setError(null);
          }, 4000);
        },
        request: requestParams,
      });
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during payment initialization.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="font-syne">
      <section className="grid place-items-center h-screen">
        <div className="flex flex-col items-center gap-4 text-center p-4 md:w-3/4 lg:w-3/5">
          <img
            src="https://www.paybridge.africa/_vercel/image?url=%2Fsvg%2Flogo.svg&w=1536&q=100"
            alt="PayBridge logo"
            className="w-20"
          />
          <h1 className="text-3xl font-semibold font-jakarta">
            PayBridge React Example
          </h1>
          <p className="text-sm text-gray-600">
            The PayBridge React Example shows how to integrate the PayBridge API
            into a React app for secure payments and dynamic transfers.
          </p>
          <p>Click the button below to initialize the transaction.</p>
          <button
            type="button"
            className="px-6 py-2 bg-slate-600 w-48 rounded-lg text-white font-inter hover:bg-slate-600/70 disabled:bg-slate-600/50 duration-200 text-sm"
            onClick={initializePayment}
            disabled={submitting}
          >
            {submitting ? "Processing..." : `Pay ₦100.00`}
          </button>
          <div className="mt-10">
            {error && (
              <p className="text-red-500 font-medium animate-bounce">{error}</p>
            )}
          </div>
          <div className="mt-10">
            {success && (
              <p className="text-green-500 font-medium animate-bounce">{success}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
