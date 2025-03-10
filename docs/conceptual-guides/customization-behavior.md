# Customization behavior

VLT supports site customization via the add-on ...
This add-on has a behavior that can be applied to the Plone Site root or to any object that implement `INavigationRoot` interface (eg. language root folder.)
This add-on uses the `navroot` expander to get all the extra fields that these customizations.
Then VLT access this data to display the customizations in the right place.


## Header

### Site logo

You can define the site logo not only for the main site, but also for the subsites provided by content types that implement `INavigationRoot` interface.

### Complementary logo

You can define a complementary logo in the header, for convenience purposes.
This logo shows up on the right-most side of the header.

### Intranet Flag

If you use the intranet header (`config.settings.intranetHeader`) the intranet flag is the text in the grey pill at the top of the header.

### Actions

You can define the actions at the top of the header.
These are links to other pages, defined by (title, target URL and if it opens in a new tab or not).


## Theming

### Navigation text color

You can customize the navigation text color in this widget.

### Fat menu / Breadcrumbs text color

You can customize the fat menu (the menu that unfolds if you click on any item of the site sections) text color in this widget.
It applies also to the breadcrumbs text color.

### Fat menu background color

You can customize the fat menu background color in this widget.

### Footer font color

You can customize the footer font color in this widget.

### Footer background color

You can customize the footer background color in this widget.


## Footer

### Footer links

The footer can contain additional links defined in this widget.
These are links to other pages, defined by (title, target URL and if it opens in a new tab or not).

### Footer logos

The footer can contain a list of logos.
These are images defined in the site with links to other pages, defined by (title, logo image, target URL and if it opens in a new tab or not).
Their appearance can be further customized by defining the size of the logos (small or large), and the width of the their container (default or layout).
