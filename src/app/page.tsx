"use client";

import {GoogleGeminiEffectDemo} from '../component/GoogleGeminiEffectDemo';
import {CardHoverEffectDemo} from '../component/CardHoverEffectDemo';
import WireAndCable from './Home/WireAndCable';
import { Review } from "./Home/Review";
import ProductLink from './Home/ProductLink';
import Page from './product/page';
import Certificate from './Home/Certificate';
import HouseWire from './Home/HouseWire';
import MulticoreFlexible from './Home/MulticoreFlexible';
import SubmersibleCable from './Home/SubmersibleCable';
import ServiceWire from './Home/ServiceWire';



export default function Home() {
  return (
   <>
{/* <GoogleGeminiEffectDemo/> */}
<HouseWire/>
<MulticoreFlexible/>
<SubmersibleCable/>
<ServiceWire/>
<CardHoverEffectDemo/>
<Certificate />

{/* <ProductLink/> */}
{/* <WireAndCable/> */}
{/* <Review/> */}

   </>
  );
}
