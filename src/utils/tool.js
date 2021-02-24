import config from "@/config/index.js";
export function imagePrefix(arrs) {
    let imageArray = arrs.map((image) => {
        if (image.substr(0, 4) !== "http") {
            return config.staticPrefix + image;
        } else {
            return image;
        }
    });
    return imageArray;
}
