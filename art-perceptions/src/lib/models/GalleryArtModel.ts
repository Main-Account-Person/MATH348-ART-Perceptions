export interface GalleryArt {
    embark_ID: number;
    URL: string;
    Disp_Title: string;
    Disp_Maker_1: string;
    Images: Array<Images>;
}

interface Images {
    ImagePath: string;
    ThumbnailPath: string;
    PreviewPath: string;
}

type PickRenameMulti<T, R extends
    { [K in keyof R]: K extends keyof T ? PropertyKey : "Error: key not in T" }
    > = { [P in keyof T as P extends keyof R ? R[P] : P]: T[P] };

export type GalleryArtTest = PickRenameMulti<GalleryArt, {embark_ID: "id", URL: "url", Disp_Title: "title", Disp_Maker_1: "artist"}>;
