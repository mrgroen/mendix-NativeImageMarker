## NativeImageViewer
View images, with zoom and pan

## Features
- Shows the image full screen 
- Allows zooming and panning
- Tap image to close viewer
- Image source can be Mendix image, base64 encoded data URL or a local file on the device

## Image width / height
Widget needs the image width/height. For images created in the backend, use CommunityCommons.GetImageDimensions. For images taken in the native app, use the TakePictureAdvanced JavaScript action, which returns the dimensions in the ImageMetaData object.

## Usage
- Place widget on a page, preferably with a full page layout and no other content.
- Configure a close action, usually just Close page is sufficient.

Please note that the widget assumes to show the image fullscreen, so use a fullpage layout and take out any spacing.

The intended use of this widget is to show it without any other content on the page.

It is possible to put other content, like a header or footer, on the page, these will overlay the image.

### Data URL
For base64 encoded image data, the data must have the data URL prefix, where `<ext>` is the image format, like jpg or png: 
```
data:image/<ext>;base64,<base64 data>
```
(Do not include the `< >` in the data.)

