export interface Sponsor {
  name: string;
  logo: string;
  blurb: string;
}

export interface SponsorTierData {
  tierName: string;
  sponsors: Sponsor[];
}
