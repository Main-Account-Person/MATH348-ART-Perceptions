export interface GalleryArt {
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
