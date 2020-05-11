## NativeImageViewer
View images, with zoom and pan

## Features
- Shows the image full screen 
- Allows zooming and panning
- Tap image to close viewer

## Image width / height
Widget needs the image width/height. For images created in the backend, use CommunityCommons.GetImageDimensions. For images taken in the native app, the TakePicture JS action sets the dimensions on the image object. This is added in version

## Usage
- Place widget on a page with a full page layout.
- No other content on the page will be visible as the widget is a modal
- Configure a close action, usually just Close page is sufficient.

## Known issue
- On iOS device rotation does not work correctly, only portrait works well. Issue outside the widget.
