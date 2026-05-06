"use client";
import dynamic from "next/dynamic";

const FlightSearchnew = dynamic(() => import("./FlightSearchDemo"), { ssr: false });
const SpecialDeals = dynamic(() => import("./SpecialDeals"), { ssr: false });
const DomesticFlights = dynamic(() => import("./DomesticFlights"), { ssr: false });
const CheapFlights = dynamic(() => import("./CheapFlights"), { ssr: false });
const PopularFlights = dynamic(() => import("./PopularFlights"), { ssr: false });
const FlightDealsNew = dynamic(() => import("./FlightDealsNew"), { ssr: false });
const ZaloBenefits = dynamic(() => import("./ZaloBenefits"), { ssr: false });
const NewsSection = dynamic(() => import("./NewsSection"), { ssr: false });
const PopularDestinations = dynamic(() => import("./PopularDestinations"), { ssr: false });

export default function ClientWrapper({ sampleDeals, flightsnew }: any) {
  return (
    <>
      <FlightSearchnew />
      <SpecialDeals />
      <PopularFlights />
      <DomesticFlights />
      <CheapFlights deals={sampleDeals} />
      <FlightDealsNew flights={flightsnew} title="Deal hot - Vé máy bay nổi bật!" />
      <ZaloBenefits />
      <NewsSection />
      <PopularDestinations />
    </>
  );
}
