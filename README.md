## NativeImageMarker
View and mark images, with zoom and pan support.

## Features
- Show image full screen or in a parent container. (the image will scale to fit the parent container)
- Zooming and panning. (drag, pinch, double-tap)
- Image source can be a Mendix image, base64 encoded data URL or local file on the device.
- Display makers on the image. (with custom colors)
- Add markers using a single tap.

## Usage
- Place widget on a page.
- Configure image source. (optional width/height)
- Configure optional markers datasource and optional add marker settings.

### Data URL
For base64 encoded image data, the data must have the data URL prefix, where `<ext>` is the image format, like jpg or png: 
```
data:image/<ext>;base64,<base64 data>
```
(Do not include the `< >` in the data.)

