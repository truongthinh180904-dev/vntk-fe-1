
import './blog.css'
import NewsSection from './NewsSection';
import PopularDestinations from './PopularDestinations';
import TravelInspiration from './TravelInspiration';
import TravelSuggestion from './TravelSuggestion';

export default async function Page() {
  
   
  return (
    <>
    <NewsSection />
    <TravelInspiration />
    <TravelSuggestion />
    <PopularDestinations />
   </>
  );
}
