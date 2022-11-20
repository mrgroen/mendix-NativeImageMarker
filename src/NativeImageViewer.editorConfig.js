import { hidePropertyIn } from "@mendix/pluggable-widgets-tools";

export function getProperties(values, defaultProperties) {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    if (values.imageSource !== "mendixImage") {
        hidePropertyIn(defaultProperties, values, "imageToView");
    }
    if (values.imageSource !== "url") {
        hidePropertyIn(defaultProperties, values, "imageUrl");
    }
    return defaultProperties;
}

export function check(values) {
    const errors = [];
    // Add errors to the above array to throw errors in Studio and Studio Pro.
    if (values.imageSource === "mendixImage" && !values.imageToView) {
        errors.push({
            property: "imageToView",
            message: "Select the image to use"
        });
    }
    if (values.imageSource === "url" && !values.imageUrl) {
        errors.push({
            property: "imageUrl",
            message: "Select the URL attribute to use"
        });
    }

    return errors;
}
