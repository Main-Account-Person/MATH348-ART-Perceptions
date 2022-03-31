export async function get() {
    const response = await fetch("https://collection.gundgallery.org/results.html?&layout=objects&format=json&maximumrecords=-1&recordType=objects_1&query=keywordPath%3DB");
    var text = await response.text();
    text = text.replace(/,(?!\s*?[{["\w])|(?<=[{[]\s*?),/g, '');
    text = text.replace(/(("Info_Page_Comm" : "[^"]+",)|("Info_Page_Comm" : "",))/g, '');
    text = text.replace(/(webkiosk.gallerysystems.com)/g, 'collection.gundgallery.org')
    const json = JSON.parse(text);
    return { body: json };
}
