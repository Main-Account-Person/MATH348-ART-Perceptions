export interface GalleryArt {
    id: number;
    url: string;
    dateAdded: string;
    title: string;
    artist: string;
    artistProper: string;
    dispDimensions: string;
    dispHeight: string;
    dispWidth: string;
    medium: string;
    support: string;
    dispMedium: string;
    images: Array<Images>;
    category: string;
    type: string;
}

interface Images {
    imageURL: string;
    thumbnailURL: string;
    previewURL: string;
}
