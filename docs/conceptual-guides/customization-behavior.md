# Customization behavior

% TODO name the add-on
VLT supports site customization via the add-on ...
This add-on has a behavior that can be applied to the Plone site root or to any object that implements the `INavigationRoot` interface, such as the language root folder.
This add-on also enhances the `@navroot` endpoint to provide the customization fields to the frontend.
Then VLT accesses this data to display the customizations in the right place.


## Header

### Site logo

You can define the site logo for the main site as well as the subsites provided by content types that implement the `INavigationRoot` interface.

### Complementary logo

You can define a complementary logo in the header, for convenience purposes.
This logo shows up on the right-most side of the header.

### Intranet Flag

If you use the intranet header (`config.settings.intranetHeader`), the intranet flag is the text in the grey pill at the top of the header.

### Actions

You can define the actions located at the top right of the header.
These are links to other pages, each of which is defined by the fields for a title, a target URL, and a boolean for whether or not to open the link in a new tab.


## Theming

### Navigation text color

You can customize the navigation text color in this widget.

### Fat menu and breadcrumbs text color

The fat menu is the menu that unfolds when you click on any item in the site section navigation.
You can customize the fat menu text color in this widget.
It also applies to the breadcrumbs text color.

### Fat menu background color

You can customize the fat menu background color in this widget.

### Footer font color

You can customize the footer font color in this widget.

### Footer background color

You can customize the footer background color in this widget.


## Footer

### Footer links

The footer can contain additional links defined in this widget.
These are links to other pages, each of which is defined by the fields for a title, a target URL, and a boolean for whether or not to open the link in a new tab.

### Footer logos

The footer can contain a list of logos.
These are images defined in the site with links to other pages, each of one defined by these fields: a title, a logo image, a target URL and a boolean in case it should open in a new tab or not.
Their appearance can be further customized by defining the size of the logos, as either `small` or `large`, and the width of the their container, either `default` or `layout`.
