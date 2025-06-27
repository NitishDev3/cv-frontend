import axios from "axios";
import { API_URL } from "../utils/apiConstants";

export const handlePayment = async (cvId : string) =>{
    try {
      const { data: order } = await axios.post(
        API_URL + "/payment/createOrder",
        {
          amount: 50,
          cvId,
        }
      );

      const options = {
        key: "rzp_test_cnkLTbn8LmODYX", // From .env
        amount: order.amount,
        currency: order.currency,
        name: "CV Builder",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {
          const verification = await axios.post(
            API_URL + "/payment/verifyOrder",
            {
              ...response,
            }
          );

          console.log(verification);

          if (verification?.data?.success) {
            console.log("Payment Successfull");
          } else {
            throw new Error("Payment Failed");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
    catch (error) {
      console.error(error);
    }
}