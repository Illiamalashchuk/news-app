export enum API {
  NewsApi = "newsApi",
  NewsData = "newsData",
  NYTimes = "NYTimes",
}

export enum NewsApiCategory {
  General = "General",
  Business = "Business ",
  Entertainment = "Entertainment ",
  Health = "Health",
  Science = "Science",
  Sports = "Sports ",
  Technology = "Technology",
}

export enum NewsDataCategory {
  Business = "Business",
  Entertainment = "Entertainment ",
  Health = "Health",
  Science = "Science",
  Sports = "Sports",
  Technology = "Technology",
  Environment = "Environment",
  Food = "Food",
  Politics = "Politics",
  Top = "Top",
  Tourism = "Tourism",
  World = "World",
}

export enum NYTimesCategory {
  "Adventure Sports" = "Adventure Sports",
  "Arts&Leisure" = "Arts & Leisure",
  "Arts" = "Arts",
  "Automobiles" = "Automobiles",
  "Blogs" = "Blogs",
  "Books" = "Books",
  "Booming" = "Booming",
  "BusinessDay" = "Business Day",
  "Business" = "Business",
  "Cars" = "Cars",
  "Circuits" = "Circuits",
  "Classifieds" = "Classifieds",
  "Connecticut" = "Connecticut",
  "Crosswords&Games" = "Crosswords &amp; Games",
  "Culture" = "Culture",
  "DealBook" = "DealBook",
  "Dining" = "Dining",
  "Editorial" = "Editorial",
  "Education" = "Education",
  "Energy" = "Energy",
  "Entrepreneurs" = "Entrepreneurs",
  "Environment" = "Environment",
  "Escapes" = "Escapes",
  "Fashion&Style" = "Fashion & Style",
  "Fashion" = "Fashion",
  "Favorites" = "Favorites",
  "Financial" = "Financial",
  "Flight" = "Flight",
  "Food" = "Food",
  "Foreign" = "Foreign",
  "Generations" = "Generations",
  "Giving" = "Giving",
  "Global Home" = "Global Home",
  "Health&Fitness" = "Health &amp; Fitness",
  "Health" = "Health",
  "Home&Garden" = "Home &Garden",
  "Home" = "Home",
  "Jobs" = "Jobs",
  "Key" = "Key",
  "Letters" = "Letters",
  "Long Island" = "Long Island",
  "Magazine" = "Magazine",
  "Market Place" = "Market Place",
  "Media" = "Media",
  "MensHealth" = "Men's Health",
  "Metro" = "Metro",
  "Metropolitan" = "Metropolitan",
  "Movies" = "Movies",
  "Museums" = "Museums",
  "National" = "National",
  "Nesting" = "Nesting",
  "Obits" = "Obits",
  "Obituaries" = "Obituaries",
  "Obituary" = "Obituary",
  "OpEd" = "OpEd",
  "Opinion" = "Opinion",
  "Outlook" = "Outlook",
  "Personal Investing" = "Personal Investing",
  "Personal Tech" = "Personal Tech",
  "Play" = "Play",
  "Politics" = "Politics",
  "Regionals" = "Regionals",
  "Retail" = "Retail",
  "Retirement" = "Retirement",
  "Science" = "Science",
  "Small Business" = "Small Business",
  "Society" = "Society",
  "Sports" = "Sports",
  "Style" = "Style",
  "Sunday Business" = "Sunday Business",
  "Sunday Review" = "Sunday Review",
  "Sunday Styles" = "Sunday Styles",
  "TMagazine" = "T Magazine",
  "TStyle" = "T Style",
  "Technology" = "Technology",
  "Teens" = "Teens",
  "Television" = "Television",
  "TheArts" = "The Arts",
  "TheBusiness of Green" = "The Business of Green",
  "TheCity Desk" = "The City Desk",
  "TheCity" = "The City",
  "TheMarathon" = "The Marathon",
  "TheMillennium" = "The Millennium",
  "TheNatural World" = "The Natural World",
  "TheUpshot" = "The Upshot",
  "TheWeekend" = "The Weekend",
  "TheYear in Pictures" = "The Year in Pictures",
  "Theater" = "Theater",
  "Then&Now" = "Then & Now",
  "ThursdayStyles" = "Thursday Styles",
  "TimesTopics" = "Times Topics",
  "Travel" = "Travel",
  "U.S." = "U.S.",
  "Universal" = "Universal",
  "Upshot" = "Upshot",
  "UrbanEye" = "UrbanEye",
  "Vacation" = "Vacation",
  "Washington" = "Washington",
  "Wealth" = "Wealth",
  "Weather" = "Weather",
  "WeekinReview" = "Week in Review",
  "Week" = "Week",
  "Weekend" = "Weekend",
  "Westchester" = "Westchester",
  "WirelessLiving" = "Wireless Living",
  "WomensHealth" = "Women's Health",
  "Working" = "Working",
  "Workplace" = "Workplace",
  "World" = "World",
  "YourMoney" = "Your Money",
}

export interface NewsApiArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id?: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export interface NewsApiSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface NewsDataArticle {
  article_id: string;
  category: string[];
  content: string;
  country: string[];
  creator: string[];
  description: string;
  image_url: string | null;
  keywords: string[];
  language: string;
  link: string;
  pubDate: string;
  source_id: string;
  source_priority: number;
  title: string;
  video_url: string | null;
}

export interface NewsDataSource {
  status: string;
  id: string;
  name: string;
  url: string;
  category: NewsDataCategory;
  language: string;
  country: string;
}

export interface NYTimesArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  subsection_name: string;
  type_of_material: string;
  _id: string;
  multimedia: Array<{ url: string }>;
}

export interface Article {
  title: string;
  description: string;
  content: string;
  author?: string;
  origin: string;
  image?: string;
  publishedAt: string;
}

export type CategoryType = NewsApiCategory | NewsDataCategory | NYTimesCategory;
export type SourceType = { value: string; label: string };
export type ArticleType = NewsApiArticle & NewsDataArticle & NYTimesArticle;
