// Tuyến bay US nội địa (25 bang × 5 thành phố = 125 city)
const usRoutes: Record<string, string[]> = {
  // ===== California =====
  "Los Angeles": ["New York City", "Chicago", "Dallas", "Las Vegas", "San Francisco"],
  "San Francisco": ["Seattle", "Denver", "Las Vegas", "Los Angeles", "Chicago"],
  "San Diego": ["Los Angeles", "Phoenix", "Dallas", "San Francisco", "Las Vegas"],
  "San Jose": ["Los Angeles", "Seattle", "Denver", "Portland", "San Francisco"],
  "Sacramento": ["Los Angeles", "Seattle", "Las Vegas", "San Diego", "Phoenix"],

  // ===== Texas =====
  "Houston": ["Dallas", "Atlanta", "Chicago", "Miami", "Denver"],
  "Dallas": ["Houston", "Chicago", "Los Angeles", "New York City", "Denver"],
  "Austin": ["Dallas", "Houston", "Denver", "Los Angeles", "Chicago"],
  "San Antonio": ["Dallas", "Houston", "Phoenix", "Denver", "Atlanta"],
  "Fort Worth": ["Dallas", "Houston", "Los Angeles", "Chicago", "Miami"],

  // ===== Florida =====
  "Miami": ["Atlanta", "Orlando", "Washington DC", "New York City", "Chicago"],
  "Orlando": ["Miami", "Atlanta", "N!ew York City", "Dallas", "Houston"],
  "Tampa": ["Miami", "Atlanta", "Orlando", "New York City", "Chicago"],
  "Jacksonville": ["Miami", "Atlanta", "Charlotte", "Washington DC", "New York City"],
  "Tallahassee": ["Miami", "Atlanta", "Orlando", "Charlotte", "Jacksonville"],

  // ===== New York =====
  "New York City": ["Los Angeles", "Chicago", "Houston", "Miami", "Boston"],
  "Buffalo": ["New York City", "Chicago", "Boston", "Cleveland", "Philadelphia"],
  "Rochester": ["New York City", "Boston", "Philadelphia", "Chicago", "Buffalo"],
  "Albany": ["New York City", "Boston", "Philadelphia", "Washington DC", "Buffalo"],
  "Syracuse": ["New York City", "Boston", "Philadelphia", "Chicago", "Rochester"],

  // ===== Illinois =====
  "Chicago": ["Miami", "Dallas", "Boston", "Denver", "New York City"],
  "Springfield": ["Chicago", "St. Louis", "Kansas City", "Indianapolis", "Cleveland"],
  "Naperville": ["Chicago", "St. Louis", "Milwaukee", "Detroit", "Cleveland"],
  "Peoria": ["Chicago", "St. Louis", "Indianapolis", "Minneapolis", "Kansas City"],
  "Rockford": ["Chicago", "Milwaukee", "Madison", "Detroit", "Cleveland"],

  // ===== Washington =====
  "Seattle": ["San Francisco", "Los Angeles", "Denver", "Chicago", "Portland"],
  "Spokane": ["Seattle", "Portland", "Boise", "Denver", "Salt Lake City"],
  "Tacoma": ["Seattle", "Portland", "San Francisco", "Los Angeles", "Denver"],
  "Bellevue": ["Seattle", "San Francisco", "Los Angeles", "Portland", "Denver"],
  "Everett": ["Seattle", "Portland", "Boise", "San Francisco", "Los Angeles"],

  // ===== Massachusetts =====
  "Boston": ["New York City", "Chicago", "Washington DC", "Atlanta", "Miami"],
  "Cambridge": ["Boston", "New York City", "Philadelphia", "Chicago", "Washington DC"],
  "Worcester": ["Boston", "New York City", "Philadelphia", "Albany", "Hartford"],
  "Lowell": ["Boston", "New York City", "Providence", "Philadelphia", "Washington DC"],
  "Springfield (MA)": ["Boston", "Hartford", "Albany", "New York City", "Philadelphia"],

  // ===== Georgia =====
  "Atlanta": ["Miami", "New York City", "Chicago", "Dallas", "Houston"],
  "Savannah": ["Atlanta", "Miami", "Charlotte", "Orlando", "Washington DC"],
  "Athens": ["Atlanta", "Charlotte", "Orlando", "Nashville", "Miami"],
  "Augusta": ["Atlanta", "Charlotte", "Orlando", "Nashville", "Washington DC"],
  "Macon": ["Atlanta", "Savannah", "Orlando", "Charlotte", "Miami"],

  // ===== Pennsylvania =====
  "Philadelphia": ["New York City", "Washington DC", "Boston", "Chicago", "Atlanta"],
  "Pittsburgh": ["Philadelphia", "Cleveland", "Chicago", "Detroit", "New York City"],
  "Harrisburg": ["Philadelphia", "Pittsburgh", "New York City", "Washington DC", "Boston"],
  "Allentown": ["Philadelphia", "New York City", "Boston", "Cleveland", "Pittsburgh"],
  "Erie": ["Cleveland", "Pittsburgh", "Buffalo", "Detroit", "Philadelphia"],

  // ===== Ohio =====
  "Columbus": ["Chicago", "New York City", "Atlanta", "Cleveland", "Detroit"],
  "Cleveland": ["Chicago", "Detroit", "New York City", "Boston", "Philadelphia"],
  "Cincinnati": ["Chicago", "Atlanta", "New York City", "Detroit", "Cleveland"],
  "Toledo": ["Cleveland", "Detroit", "Chicago", "Columbus", "Cincinnati"],
  "Akron": ["Cleveland", "Columbus", "Pittsburgh", "Detroit", "Chicago"],

  // ===== Michigan =====
  "Detroit": ["Chicago", "New York City", "Boston", "Cleveland", "Philadelphia"],
  "Ann Arbor": ["Detroit", "Chicago", "Cleveland", "Columbus", "New York City"],
  "Grand Rapids": ["Detroit", "Chicago", "Milwaukee", "Cleveland", "Minneapolis"],
  "Lansing": ["Detroit", "Chicago", "Cleveland", "Columbus", "Philadelphia"],
  "Flint": ["Detroit", "Cleveland", "Chicago", "Buffalo", "Pittsburgh"],

  // ===== Arizona =====
  "Phoenix": ["Los Angeles", "Las Vegas", "Denver", "Dallas", "San Diego"],
  "Tucson": ["Phoenix", "Dallas", "Houston", "Los Angeles", "Denver"],
  "Mesa": ["Phoenix", "Las Vegas", "Denver", "Los Angeles", "San Diego"],
  "Scottsdale": ["Phoenix", "Los Angeles", "Denver", "Las Vegas", "San Francisco"],
  "Tempe": ["Phoenix", "San Diego", "Las Vegas", "Denver", "Dallas"],

  // ===== Colorado =====
  "Denver": ["Chicago", "Los Angeles", "San Francisco", "Phoenix", "Dallas"],
  "Colorado Springs": ["Denver", "Dallas", "Houston", "Phoenix", "Chicago"],
  "Boulder": ["Denver", "Salt Lake City", "Phoenix", "Chicago", "San Francisco"],
  "Aurora": ["Denver", "Chicago", "Dallas", "Houston", "San Francisco"],
  "Fort Collins": ["Denver", "Boulder", "Salt Lake City", "Phoenix", "Chicago"],

  // ===== North Carolina =====
  "Charlotte": ["New York City", "Atlanta", "Miami", "Washington DC", "Chicago"],
  "Raleigh": ["Charlotte", "New York City", "Atlanta", "Philadelphia", "Boston"],
  "Durham": ["Charlotte", "Raleigh", "Washington DC", "Philadelphia", "New York City"],
  "Greensboro": ["Charlotte", "Atlanta", "Washington DC", "Philadelphia", "New York City"],
  "Wilmington": ["Charlotte", "Atlanta", "Miami", "Orlando", "Washington DC"],

  // ===== Virginia =====
  "Richmond": ["Washington DC", "New York City", "Atlanta", "Charlotte", "Philadelphia"],
  "Virginia Beach": ["Norfolk", "Richmond", "Washington DC", "Charlotte", "New York City"],
  "Norfolk": ["Richmond", "Washington DC", "Philadelphia", "Charlotte", "New York City"],
  "Arlington": ["Washington DC", "New York City", "Philadelphia", "Boston", "Charlotte"],
  "Alexandria": ["Washington DC", "New York City", "Philadelphia", "Boston", "Richmond"],

  // ===== New Jersey =====
  "Newark": ["New York City", "Philadelphia", "Boston", "Washington DC", "Chicago"],
  "Jersey City": ["New York City", "Philadelphia", "Boston", "Washington DC", "Chicago"],
  "Trenton": ["Philadelphia", "New York City", "Washington DC", "Boston", "Baltimore"],
  "Paterson": ["New York City", "Philadelphia", "Boston", "Washington DC", "Chicago"],
  "Hoboken": ["New York City", "Philadelphia", "Boston", "Washington DC", "Chicago"],

  // ===== Minnesota =====
  "Minneapolis": ["Chicago", "New York City", "Denver", "Atlanta", "Dallas"],
  "Saint Paul": ["Minneapolis", "Chicago", "Milwaukee", "Detroit", "Cleveland"],
  "Rochester (MN)": ["Minneapolis", "Chicago", "Milwaukee", "Detroit", "Cleveland"],
  "Duluth": ["Minneapolis", "Chicago", "Milwaukee", "Detroit", "Cleveland"],
  "Bloomington (MN)": ["Minneapolis", "Chicago", "Milwaukee", "Detroit", "Cleveland"],

  // ===== Wisconsin =====
  "Milwaukee": ["Chicago", "Detroit", "Minneapolis", "Cleveland", "New York City"],
  "Madison": ["Milwaukee", "Chicago", "Detroit", "Minneapolis", "Cleveland"],
  "Green Bay": ["Milwaukee", "Chicago", "Detroit", "Minneapolis", "Cleveland"],
  "Kenosha": ["Milwaukee", "Chicago", "Detroit", "Minneapolis", "Cleveland"],
  "Appleton": ["Milwaukee", "Chicago", "Detroit", "Minneapolis", "Cleveland"],

  // ===== Oregon =====
  "Portland": ["Seattle", "San Francisco", "Los Angeles", "Denver", "Chicago"],
  "Salem": ["Portland", "Seattle", "San Francisco", "Los Angeles", "Denver"],
  "Eugene": ["Portland", "Seattle", "San Francisco", "Los Angeles", "Denver"],
  "Bend": ["Portland", "Seattle", "San Francisco", "Los Angeles", "Denver"],
  "Medford": ["Portland", "Seattle", "San Francisco", "Los Angeles", "Denver"],

  // ===== Nevada =====
  "Las Vegas": ["Los Angeles", "Phoenix", "San Francisco", "Denver", "Dallas"],
  "Reno": ["Las Vegas", "San Francisco", "Los Angeles", "Seattle", "Portland"],
  "Carson City": ["Reno", "Las Vegas", "San Francisco", "Los Angeles", "Seattle"],
  "Henderson": ["Las Vegas", "Los Angeles", "Phoenix", "San Francisco", "Denver"],
  "Paradise": ["Las Vegas", "Los Angeles", "Phoenix", "San Francisco", "Denver"],

  // ===== Indiana =====
  "Indianapolis": ["Chicago", "Cleveland", "Detroit", "Columbus", "New York City"],
  "Fort Wayne": ["Indianapolis", "Chicago", "Cleveland", "Detroit", "Columbus"],
  "Bloomington (IN)": ["Indianapolis", "Chicago", "Cleveland", "Detroit", "Columbus"],
  "Evansville": ["Indianapolis", "Chicago", "Cleveland", "Detroit", "Columbus"],
  "South Bend": ["Indianapolis", "Chicago", "Cleveland", "Detroit", "Columbus"],

  // ===== Tennessee =====
  "Nashville": ["Atlanta", "Chicago", "Dallas", "New York City", "Miami"],
  "Memphis": ["Nashville", "Atlanta", "Chicago", "Dallas", "Houston"],
  "Knoxville": ["Nashville", "Atlanta", "Charlotte", "Dallas", "Chicago"],
  "Chattanooga": ["Nashville", "Atlanta", "Charlotte", "Dallas", "Chicago"],
  "Clarksville": ["Nashville", "Atlanta", "Charlotte", "Dallas", "Chicago"],

  // ===== Missouri =====
  "St. Louis": ["Chicago", "Kansas City", "Nashville", "Dallas", "Denver"],
  "Kansas City": ["Chicago", "St. Louis", "Dallas", "Denver", "Atlanta"],
  "Springfield (MO)": ["St. Louis", "Kansas City", "Chicago", "Indianapolis", "Cleveland"],
  "Columbia (MO)": ["St. Louis", "Kansas City", "Chicago", "Indianapolis", "Cleveland"],
  "Independence": ["St. Louis", "Kansas City", "Chicago", "Indianapolis", "Cleveland"],

  // ===== Maryland =====
  "Baltimore": ["Washington DC", "Philadelphia", "New York City", "Boston", "Atlanta"],
  "Annapolis": ["Baltimore", "Washington DC", "Philadelphia", "New York City", "Boston"],
  "Frederick": ["Baltimore", "Washington DC", "Philadelphia", "New York City", "Boston"],
  "Silver Spring": ["Baltimore", "Washington DC", "Philadelphia", "New York City", "Boston"],
  "Rockville": ["Baltimore", "Washington DC", "Philadelphia", "New York City", "Boston"],

  // ===== Louisiana =====
  "New Orleans": ["Atlanta", "Houston", "Dallas", "Miami", "Chicago"],
  "Baton Rouge": ["New Orleans", "Atlanta", "Houston", "Dallas", "Miami"],
  "Lafayette": ["New Orleans", "Atlanta", "Houston", "Dallas", "Miami"],
  "Shreveport": ["New Orleans", "Atlanta", "Houston", "Dallas", "Miami"],
  "Lake Charles": ["New Orleans", "Atlanta", "Houston", "Dallas", "Miami"],
};

export default usRoutes;
