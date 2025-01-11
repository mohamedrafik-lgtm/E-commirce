import ShippingOptions from "@/components/ShippengMethodMultyShoses";



const ContactPage = () => {
    const handleShippingSelect = (method: {
        id: number;
        method: string;
        description: string;
        cost: number;
      }) => {
        console.log("Selected Shipping Method:", method);
      };
  
    return (
        <div>


              <ShippingOptions onShippingSelect={handleShippingSelect} />

        </div>
    );
}


export default ContactPage;


