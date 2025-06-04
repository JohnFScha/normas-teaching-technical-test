import {

Response,
Result,
AlternativeSlugs,
AssetType,
ResultLinks,
TopicSubmissions,
Urls,
User,
UserLinks,
ProfileImage,
Social,
ParsedResult,
} from './search-results';

describe('Interfaces', () => {
test('should create a valid Response object', () => {
  const alternative_slugs: AlternativeSlugs = {
    en: "slug-en",
    es: "slug-es",
    ja: "slug-ja",
    fr: "slug-fr",
    it: "slug-it",
    ko: "slug-ko",
    de: "slug-de",
    pt: "slug-pt",
  };

  const resultLinks: ResultLinks = {
    self: "http://self",
    html: "http://html",
    download: "http://download",
    download_location: "http://download/location",
  };

  const topicSubmissions: TopicSubmissions = {
    animals: { status: "approved", approved_on: new Date('2020-01-01') },
    nature:  { status: "approved", approved_on: new Date('2020-01-02') },
    spring:  { status: "approved", approved_on: new Date('2020-01-03') },
  };

  const urls: Urls = {
    raw: "http://raw",
    full: "http://full",
    regular: "http://regular",
    small: "http://small",
    thumb: "http://thumb",
    small_s3: "http://small_s3",
  };

  const userLinks: UserLinks = {
    self: "http://self",
    html: "http://html",
    photos: "http://photos",
    likes: "http://likes",
    portfolio: "http://portfolio",
    following: "http://following",
    followers: "http://followers",
  };

  const profileImage: ProfileImage = {
    small: "http://small",
    medium: "http://medium",
    large: "http://large",
  };

  const social: Social = {
    instagram_username: null,
    portfolio_url: null,
    twitter_username: null,
    paypal_email: null,
  };

  const user: User = {
    id: "user1",
    updated_at: new Date('2020-01-01'),
    username: "username1",
    name: "Name One",
    first_name: "Name",
    last_name: "One",
    twitter_username: null,
    portfolio_url: null,
    bio: null,
    location: null,
    links: userLinks,
    profile_image: profileImage,
    instagram_username: null,
    total_collections: 0,
    total_likes: 0,
    total_photos: 0,
    total_promoted_photos: 0,
    total_illustrations: 0,
    total_promoted_illustrations: 0,
    accepted_tos: true,
    for_hire: false,
    social: social,
  };

  const result: Result = {
    id: "result1",
    slug: "slug",
    alternative_slugs: alternative_slugs,
    created_at: new Date('2020-01-01'),
    updated_at: new Date('2020-01-02'),
    promoted_at: null,
    width: 1920,
    height: 1080,
    color: "#ffffff",
    blur_hash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    description: null,
    alt_description: "Alternative description",
    breadcrumbs: [],
    urls: urls,
    links: resultLinks,
    likes: 100,
    liked_by_user: false,
    current_user_collections: [],
    sponsorship: null,
    topic_submissions: topicSubmissions,
    asset_type: AssetType.Photo,
    user: user,
  };

  const response: Response = {
    total: 1,
    total_pages: 1,
    results: [result],
  };

  expect(response.total).toBe(1);
  expect(response.results.length).toBe(1);
  expect(response.results[0].user.username).toBe("username1");
});

test('should create a valid ParsedResult object', () => {
  const parsedResult: ParsedResult = {
    id: "result1",
    height: 1080,
    width: 1920,
    urls: {
      full: "http://full",
      regular: "http://regular",
      small: "http://small",
      thumb: "http://thumb",
    },
    description: "A parsed description",
  };

  expect(parsedResult.id).toBe("result1");
  expect(parsedResult.height).toBe(1080);
  expect(parsedResult.urls.full).toContain("http");
});
});