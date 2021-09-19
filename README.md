## NativeImageViewer
View images, with zoom and pan

## Features
- Shows the image full screen 
- Allows zooming and panning
- Tap image to close viewer

## Image width / height
Widget needs the image width/height. For images created in the backend, use CommunityCommons.GetImageDimensions. For images taken in the native app, use the TakePictureAdvanced JavaScript action, which returns the dimensions in the ImageMetaData object.

## Usage
- Place widget on a page with a full page layout.
- No other content on the page will be visible as the widget is a modal
- Configure a close action, usually just Close page is sufficient.

## In modal or directly
The widget initally always rendered the image in a modal. Mostly because rendering directly on the Mendix page did not work very well initially. 

As of Mendix 9, this works correctly. It is best to show the image directly, without modal because:
- If you still use a modal in Mendix 9, the image may be visible while the modal closes.
- Showing the image directly allows the widget to react to device rotation.
- Smooth animation

Please note that the widget assumes to show the image fullscreen, so use a fullpage layout and don't place any other content on the page. Also, take out any spacing.

