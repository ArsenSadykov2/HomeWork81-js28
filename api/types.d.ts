export interface LongLink {
    id: string;
    shortUrl: string;
    originalUrl: string;
}

export type LinkWithoutId = Omit<LongLink, 'id'>;