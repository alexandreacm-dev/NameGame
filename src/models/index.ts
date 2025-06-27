type HeadShot = {
    alt: string;
    height: number
    id: string;
    mimeType: string;
    type: string;
    url: string;
    width: 500
}
export interface IProfile {
    id: string;
    firstName: string;
    headshot: HeadShot;
    jobTitle: string;
    lastName: string;
    slug: string;
    socialLinks: [],
    type: string;
}