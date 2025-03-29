import { HappyClients } from "../app/Home/HappyClients";

export function CardHoverEffectDemo() {
  return(  <div className="max-w-5xl bg-black mx-auto px-8">
      <HappyClients items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "1 lac + Happy customers",
    description:
      "Delighting over 1000+ customers with exceptional service, fostering smiles and satisfaction through our dedicated commitment to excellence.",
    link: "https://stripe.com",
  },
  {
    title: "Excellence Certificate",
    description:
      "Proud recipients of the Excellence Certificate, a testament to our unwavering dedication to delivering top-tier products and services.",
    link: "https://netflix.com",
  },
  {
    title: "Latest tecnologies",
    description:
      "Embracing the forefront of innovation, our commitment to integrating the latest technologies defines our progressive approach to industry leadership.",
    link: "https://google.com",
  },

];
