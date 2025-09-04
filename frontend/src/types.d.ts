export interface Link {
    id?: string;
    originalUrl: string;
    shortUrl?: string;
}
export type LinkWithoutId = Omit<Link, 'id'>;

export interface OriginalUrl {
    originalUrl: string;
}