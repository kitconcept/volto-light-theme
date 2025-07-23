# kitconcept's volto-light-theme Release Notes

<!-- towncrier release notes start -->
## 7.0.0a15 (2025-07-17)

### Backend


#### Breaking changes:

- We renamed this three fields in the `kitconcept.footer` behavior. @sneridagh
  `footer_main_logo_inversed` => `footer_logo`
  `footer_logo` => `post_footer_logo`
  `footer_logo_link` => `post_footer_logo_link` 


#### New features:

- Add Spanish translation [@macagua] [#597](https://github.com/kitconcept/volto-light-theme/issues/597)



### Frontend

#### Breaking

- We renamed this three fields in the `kitconcept.footer` behavior. @sneridagh
  `footer_main_logo_inversed` => `footer_logo`
  `footer_logo` => `post_footer_logo`
  `footer_logo_link` => `post_footer_logo_link` 

#### Feature

- Added block model v3 as opt-in. @sneridagh [#532](https://github.com/kitconcept/volto-light-theme/pull/532)
- Update Spanish translation [@macagua] [#596](https://github.com/kitconcept/volto-light-theme/pull/596)

#### Bugfix

- Fixed the use case where the sticky menu item is allowed to not have link. @sneridagh 

#### Internal

- Improve listing template of Listing, Search and Grid block with Card Component. @iFlameing [#601](https://github.com/kitconcept/volto-light-theme/pull/601)



### Project

No significant changes.




## 7.0.0a14 (2025-07-10)

### Backend


#### New features:

- Added `footer_main_logo_inversed` image field to kitconcept.footer behavior. This adds support for setting an inversed color main logo that will appear at the top of the footer address. @sneridagh [#600](https://github.com/kitconcept/volto-light-theme/issues/600)


#### Internal:

- Add example content for Event Calendar block @iFlameing [#591](https://github.com/kitconcept/volto-light-theme/issues/591)



### Frontend

#### Feature

- Add Event calendar block @iFlameing. [#591](https://github.com/kitconcept/volto-light-theme/pull/591)
- Added `footer_main_logo_inversed` image field to kitconcept.footer behavior. This adds support for setting an inversed color main logo that will appear at the top of the footer address. @sneridagh [#600](https://github.com/kitconcept/volto-light-theme/pull/600)

#### Bugfix

- Fix margins for narrow centered image block on mobile. @danalvrz [#587](https://github.com/kitconcept/volto-light-theme/pull/587)
- Show date for news item on mobile and display kicker first. @danalvrz [#589](https://github.com/kitconcept/volto-light-theme/pull/589)
- Fix sticky menu background color problems @iRohitSingh [#594](https://github.com/kitconcept/volto-light-theme/pull/594)
- Fixed default `selectedItemAttrs` for Teaser to include Person specific attributes. @sneridagh 

#### Internal

- Add acceptance test for Grid block(Image and Listing). @iFlameing [#595](https://github.com/kitconcept/volto-light-theme/pull/595)



### Project

No significant changes.




## 7.0.0a12 (2025-06-18)

### Backend


#### New features:

- Reintroduce an improved `Anontools` using `portal_actions`. @sneridagh [#581](https://github.com/kitconcept/volto-light-theme/issues/581)



### Frontend

#### Feature

- Reintroduce an improved `Anontools` using `portal_actions`. @sneridagh [#581](https://github.com/kitconcept/volto-light-theme/pull/581)

#### Bugfix

- Fix sticky menu precedence in z-index with the fat menu. @sneridagh [#582](https://github.com/kitconcept/volto-light-theme/pull/582)
- Fixed listing in grids variations to match the standalone ones (except Grid). @sneridagh [#582](https://github.com/kitconcept/volto-light-theme/pull/582)
- Fixed Person CSS in Search block. @sneridagh [#584](https://github.com/kitconcept/volto-light-theme/pull/584)



### Project


#### Bugfix

- Improved Visual Regression tests. @sneridagh
  Split the Storybook ones into their own config.
  Improve naming for GHA UI. [#584](https://github.com/kitconcept/volto-light-theme/pull/584)


#### Internal

- Better Storybook support, unique reusable build as an artifact. @sneridagh 


#### Documentation

- Reintroduce an improved `Anontools` using `portal_actions`. @sneridagh [#581](https://github.com/kitconcept/volto-light-theme/pull/581)



## 7.0.0a11 (2025-06-12)

### Backend


#### Internal:

- Add example content of missing blocks @iRohitSingh 



### Frontend

#### Bugfix

- Do not show sticky menu in add view. @sneridagh 
- Fix aspect ratio for images in file grid teaser block @iRohitSingh 
- Fixed position of sticky menu for small screens. @sneridagh 

#### Internal

- Added visual regression tests for Storybook stories. @sneridagh [#576](https://github.com/kitconcept/volto-light-theme/pull/576)
- Upgrade to Volto 18.23.0 @sneridagh 
- Use `vitest` for unit tests. @sneridagh 



### Project


#### Internal

- Added visual regression tests for Storybook stories. @sneridagh [#576](https://github.com/kitconcept/volto-light-theme/pull/576)
- Fix acceptance test commands. @davisagli 



## 7.0.0a11 (2025-06-12)

### Backend


#### Internal:

- Add example content of missing blocks @iRohitSingh 



### Frontend

#### Bugfix

- Do not show sticky menu in add view. @sneridagh 
- Fix aspect ratio for images in file grid teaser block @iRohitSingh 
- Fixed position of sticky menu for small screens. @sneridagh 

#### Internal

- Added visual regression tests for Storybook stories. @sneridagh [#576](https://github.com/kitconcept/volto-light-theme/pull/576)
- Upgrade to Volto 18.23.0 @sneridagh 
- Use `vitest` for unit tests. @sneridagh 



### Project

No significant changes.


## 7.0.0a10 (2025-06-10)

### Backend

No significant changes.




### Frontend

#### Bugfix

- Fixed Person Teaser top variant. Added Storybook. @sneridagh 



### Project

No significant changes.




## 7.0.0a9 (2025-06-09)

### Backend

No significant changes.




### Frontend

#### Bugfix

- Fixed Teaser styling @sneridagh [#573](https://github.com/kitconcept/volto-light-theme/pull/573)

#### Internal

- Fix aspect ratio for images in file teaser block @iRohitSingh 



### Project

No significant changes.




## 7.0.0a8 (2025-06-06)

### Backend

No significant changes.




### Frontend

#### Bugfix

- Fix duplicated pagination on mobile. @danalvrz [#558](https://github.com/kitconcept/volto-light-theme/pull/558)
- Fixed summaries on Events and News Items. @sneridagh [#567](https://github.com/kitconcept/volto-light-theme/pull/567)
- Update volto-carousel-block, fixed adaptation needed for the latest VLT changes. @sneridagh 



### Project


#### Internal

- Split the core acceptance tests in three so they are more performant. @sneridagh 



## 7.0.0a7 (2025-06-04)

### Backend


#### New features:

- Update pt_BR translation. @ericof 



### Frontend

#### Feature

- Update pt_BR translation. @ericof 



### Project

No significant changes.




## 7.0.0a6 (2025-06-04)

### Backend


#### Internal:

- Update social media to latest to fix Redux complaining. @sneridagh 



### Frontend

#### Internal

- Update social media to latest to fix Redux complaining. @sneridagh 



### Project

No significant changes.




## 7.0.0a5 (2025-06-04)

### Backend

No significant changes.




### Frontend

#### Breaking

- The `Body` Teaser component has been shadowed, including the `placeholder` in case that the Teaser is empty. @sneridagh
  See [the upgrade guide](https://volto-light-theme.readthedocs.io/how-to-guides/upgrade-guide.html) for more information. [#555](https://github.com/kitconcept/volto-light-theme/pull/555)

#### Feature

- Add support for Person content type in teasers, teasers in grids and listings. @sneridagh [#555](https://github.com/kitconcept/volto-light-theme/pull/555)
- Added string interpolation {searchTerm} in the custom searchURL in intranet header search widget. @sneridagh 



### Project

No significant changes.




## 7.0.0a4 (2025-05-22)

### Backend


#### New features:

- Added customizable colophon footer behavior field `footer_colophon_text`. @sneridagh 



### Frontend

#### Internal

- Added some of the Volto's Cypress tests. @sneridagh [#540](https://github.com/kitconcept/volto-light-theme/pull/540)



### Project


#### Documentation

- Added Storybook for VLT. @sneridagh [#537](https://github.com/kitconcept/volto-light-theme/pull/537)
- Added documentation for customizable colophon footer. @sneridagh 



## 6.0.1 (2025-05-15)

### Backend

No significant changes.




### Frontend

#### Bugfix

- Removed background color specification in the whole footer. We only want it in some areas of it, and depending if some sections are present or not. @sneridagh 



### Project

No significant changes.




## 6.0.0 (2025-05-14)

### Backend

No significant changes.




### Frontend

No significant changes.


### Project


#### Internal

- Release VLT 6.0.0 final.
  See the new documentation: https://volto-light-theme.readthedocs.io/
  the upgrade guide: https://volto-light-theme.readthedocs.io/how-to-guides/upgrade-guide.html
  and the final release notes: https://github.com/kitconcept/volto-light-theme/releases/tag/6.0.0 



## 6.0.0a25 (2025-05-14)

### Backend

No significant changes.




### Frontend

#### Feature

- Add --image-aspect-ratio docs & make Slider use the CSS prop. @danalvrz [#535](https://github.com/kitconcept/volto-light-theme/pull/535)
- Integration with the intranet control panel settings for the intranet header. @sneridagh [#542](https://github.com/kitconcept/volto-light-theme/pull/542)

#### Bugfix

- Fixed props for Summary component in Teaser view. @sneridagh [#536](https://github.com/kitconcept/volto-light-theme/pull/536)
- Color fixes for Footer & metadata block. @danalvrz [#544](https://github.com/kitconcept/volto-light-theme/pull/544)



### Project

No significant changes.




## 6.0.0a24 (2025-05-06)

### Backend


#### New features:

- Added behavior `voltolighttheme.sticky_menu`. @sneridagh [#523](https://github.com/kitconcept/volto-light-theme/issues/523)
- Better naming for the specific kitconcept's behaviors for distributions. @sneridagh [#530](https://github.com/kitconcept/volto-light-theme/issues/530)



### Frontend

#### Feature

- Added `sticky_menu` slot. @sneridagh [#523](https://github.com/kitconcept/volto-light-theme/pull/523)
- Better naming for the specific kitconcept's behaviors for distributions. @sneridagh [#530](https://github.com/kitconcept/volto-light-theme/pull/530)
- Use `--image-aspect-ratio` for all images. @danalvrz [#533](https://github.com/kitconcept/volto-light-theme/pull/533)



### Project


#### Documentation

- Remove mention to kitconcept's specific behaviors for distributions since we don't know their final location. @sneridagh [#530](https://github.com/kitconcept/volto-light-theme/pull/530)



## 6.0.0a23 (2025-04-30)

### Backend

No significant changes.




### Frontend

#### Bugfix

- Do not use the color contrast checker if the field is not in the color map settings config. @sneridagh [#529](https://github.com/kitconcept/volto-light-theme/pull/529)
- Adjustments to the footer, conditional "Follow us" text and footer_links container. @sneridagh [#529](https://github.com/kitconcept/volto-light-theme/pull/529)



### Project

No significant changes.




## 6.0.0a22 (2025-04-29)

### Backend


#### New features:

- Added `distributions.py` module. Added new behavior: `kitconcept.distributions.footer`.
  These behaviors power the "distribution" side of VLT customizations.
  @sneridagh [#525](https://github.com/kitconcept/volto-light-theme/issues/525)


#### Bug fixes:

- Adjust help for fields `intranet_flag` `complementary_logo`. @sneridagh [#524](https://github.com/kitconcept/volto-light-theme/issues/524)


#### Internal:

- Improve setup profiles for demo and acceptance. @sneridagh [#522](https://github.com/kitconcept/volto-light-theme/issues/522)
- Remove support for Python 3.10 and 3.11. @sneridagh [#525](https://github.com/kitconcept/volto-light-theme/issues/525)



### Frontend

#### Breaking

- Remove `Anontools` from the headers.
  If you want to add them, you can use the `header_actions` field in the site customization behaviors. @sneridagh [#522](https://github.com/kitconcept/volto-light-theme/pull/522)
- Updated the footer structure and look and feel:
  - Follow us, powered by `@plonegovbr/volto-social-media`
  - Footer links
  - Colophon

  All of them are powered by their slots, so they are customizable.

  @sneridagh [#525](https://github.com/kitconcept/volto-light-theme/pull/525)

#### Feature

- Allow `intranet_flag` in both headers. @sneridagh [#524](https://github.com/kitconcept/volto-light-theme/pull/524)
- Added distribution core footer, only active if the `kitconcept.distributions.footer` is installed. @sneridagh [#525](https://github.com/kitconcept/volto-light-theme/pull/525)

#### Bugfix

- Minor typo fix in color contrast check message. @danalvrz [#526](https://github.com/kitconcept/volto-light-theme/pull/526)
- Fix customized object list widget when data doesn't contain a value yet. @davisagli [#527](https://github.com/kitconcept/volto-light-theme/pull/527)



### Project


#### Documentation

- Updated upgrade guide for the removal of the `Anontools` from the headers. @sneridagh [#522](https://github.com/kitconcept/volto-light-theme/pull/522)
- Added documentation for custom slots present in VLT and how to remove the "Colophon".
  Added documentation for kitconcept's distribution behaviors. @sneridagh [#525](https://github.com/kitconcept/volto-light-theme/pull/525)



## 6.0.0a21 (2025-04-02)

### Backend


#### Internal:

- Test with Plone 6.1.1. @davisagli 



### Frontend

#### Bugfix

- Fixed `Tags` component container. @sneridagh [#517](https://github.com/kitconcept/volto-light-theme/pull/517)
- Improve position of the intranet flag in responsive viewports. @sneridagh [#518](https://github.com/kitconcept/volto-light-theme/pull/518)



### Project


#### Internal

- Adjust CI to get Plone version from backend Makefile. @davisagli 



## 6.0.0a20 (2025-04-01)

### Backend


#### New features:

- Added new fields `has_intranet_header` and `has_fat_menu` to site customization behaviors. @sneridagh [#516](https://github.com/kitconcept/volto-light-theme/issues/516)


#### Internal:

- Ensures filename of source distribution follows PEP 625. @ericof 



### Frontend

#### Breaking

- Remove feature flags, move to site customizations. @sneridagh [#516](https://github.com/kitconcept/volto-light-theme/pull/516)
- Remove Plone portal actions from headers. @sneridagh [#516](https://github.com/kitconcept/volto-light-theme/pull/516)

#### Bugfix

- Minor CSS fixes and add docs on colors. @danalvrz [#509](https://github.com/kitconcept/volto-light-theme/pull/509)



### Project


#### Documentation

- Complete upgrade guide with the recent breaking changes and additions. @sneridagh [#516](https://github.com/kitconcept/volto-light-theme/pull/516)



## 6.0.0a19 (2025-03-25)

### Backend

No significant changes.




### Frontend

#### Bugfix

- Fix grid creation, improve the blockConfig check. @sneridagh [#510](https://github.com/kitconcept/volto-light-theme/pull/510)



### Project

No significant changes.




## 6.0.0a18 (2025-03-21)

### Backend


#### New features:

- Added upgrade step for update old data structure in `footer_links` and `footer_logos`. @sneridagh [#508](https://github.com/kitconcept/volto-light-theme/issues/508)
- Install behavior to Plone site in demo profile. @sneridagh 



### Frontend

#### Feature

- Add Color Contrast Checker component @danalvrz [#463](https://github.com/kitconcept/volto-light-theme/pull/463)
- Add docs for ColorContrastChecker. @danalvrz [#507](https://github.com/kitconcept/volto-light-theme/pull/507)

#### Bugfix

- Make the `footer_links` and `footer_logos` loops more resilient. @sneridagh [#508](https://github.com/kitconcept/volto-light-theme/pull/508)



### Project


#### Internal

- GHA: Fix tag workflow @ericof 


#### Documentation

- Added upgrade guide documentation for update old data structure in `footer_links` and `footer_logos`. @sneridagh [#508](https://github.com/kitconcept/volto-light-theme/pull/508)



## 6.0.0a17 (2025-03-20)

### Backend


#### New features:

- Added the Site Customization behaviors. @sneridagh [#497](https://github.com/kitconcept/volto-light-theme/issues/497)
- Initial release @ericof 


#### Internal:

- Update README file for the package @ericof 



### Frontend

#### Breaking

- Renamed widget: `ThemeColorPicker` -> `ColorPicker`. @sneridagh [#486](https://github.com/kitconcept/volto-light-theme/pull/486)
- Renamed widget: `BackgroundColorWidget` -> `themeColorSwatch`. @sneridagh [#486](https://github.com/kitconcept/volto-light-theme/pull/486)
- Renamed widget: `sizeWidget` -> `size`. @sneridagh [#486](https://github.com/kitconcept/volto-light-theme/pull/486)

#### Feature

- New widget: `colorPicker`. @sneridagh [#486](https://github.com/kitconcept/volto-light-theme/pull/486)
- New widget: `themeColorSwatch`. @sneridagh [#486](https://github.com/kitconcept/volto-light-theme/pull/486)
- Add `@kitconcept/volto-banner-block` to the recommended VLT add-ons. @sneridagh [#487](https://github.com/kitconcept/volto-light-theme/pull/487)
- New widget: `object_list`. @sneridagh [#491](https://github.com/kitconcept/volto-light-theme/pull/491)
- Use the `@inherit` endpoint. @sneridagh [#494](https://github.com/kitconcept/volto-light-theme/pull/494)
- Update volto-highlight-block to 4.1.0 @sneridagh [#498](https://github.com/kitconcept/volto-light-theme/pull/498)

#### Bugfix

- Remove title attribute from the logo. @davisagli [#336](https://github.com/kitconcept/volto-light-theme/pull/336)
- Color fixes for description, links and buttons for Slider & Highlight blocks. @danalvrz [#476](https://github.com/kitconcept/volto-light-theme/pull/476)
- Fixed nested blocks theme: when the theme is not set, inherit from parent instead of getting the default one for the current nested block. @sneridagh [#489](https://github.com/kitconcept/volto-light-theme/pull/489)
- Fix workflow: acceptance always runs, even if one of the dependencies are skipped. @sneridagh [#492](https://github.com/kitconcept/volto-light-theme/pull/492)
- Add actions to header + Fix hydration problem in /edit + Sitemap container. @sneridagh [#492](https://github.com/kitconcept/volto-light-theme/pull/492)
- Specify desktop flex direction starting at 768px screen width. @danalvrz [#496](https://github.com/kitconcept/volto-light-theme/pull/496)

#### Internal

- Added deployment workflow. @ericof [#495](https://github.com/kitconcept/volto-light-theme/pull/495)

#### Documentation

- Update requirements for plone.restapi in docs. @sneridagh [#498](https://github.com/kitconcept/volto-light-theme/pull/498)



### Project


#### Internal

- During build, push images to the registry @ericof 
- GHA: Add filter flags for changes in devops and docs @ericof 
- GHA: Add tag workflow @ericof 
- GHA: Always release images if previous tests passed. @ericof 
- GHA: Implement a manual deployment workflow @ericof 
- GHA: Just run acceptance tests if there was a change in backend or frontend @ericof 
- GHA: Remove paths filter from the main workflow @ericof 
- Support a root news fragments (for changelog) folder @ericof 


#### Documentation

- Documentation for the site customization behaviors. @sneridagh [#497](https://github.com/kitconcept/volto-light-theme/pull/497)




## 6.0.0-alpha.16 (2025-03-03)

### Frontend

#### Bugfix

- Fix last edge case in the intranet header in edit mode with the `complementary_logo`. @sneridagh [#483](https://github.com/kitconcept/volto-light-theme/pull/483)

## 6.0.0-alpha.15 (2025-03-03)

### Frontend

#### Bugfix

- Added missing header guards for `intranet_flag` and `complementary_logo`. @sneridagh [#482](https://github.com/kitconcept/volto-light-theme/pull/482)

## 6.0.0-alpha.14 (2025-03-03)

### Frontend

#### Breaking

- Remove title from required blocks. @sneridagh [#478](https://github.com/kitconcept/volto-light-theme/pull/478)
- Remove `AlignmentWidget`. @sneridagh [#481](https://github.com/kitconcept/volto-light-theme/pull/481)

### Frontend

#### Feature

- Add complementary logo for Intranet (sitecustomization behavior needed). @sneridagh [#478](https://github.com/kitconcept/volto-light-theme/pull/478)
- Wire the intranet flag with the site customization behavior. @sneridagh [#478](https://github.com/kitconcept/volto-light-theme/pull/478)

### Frontend

#### Bugfix

- Fix RenderBlocks to handle empty blocks more robustly @teekuningas [#475](https://github.com/kitconcept/volto-light-theme/pull/475)
- Header adjustments for intranet. @sneridagh [#477](https://github.com/kitconcept/volto-light-theme/pull/477)
- Fix complementary logo sizes. @sneridagh [#479](https://github.com/kitconcept/volto-light-theme/pull/479)

### Frontend

#### Internal

- import fixes and other cleanups. @sneridagh [#481](https://github.com/kitconcept/volto-light-theme/pull/481)

## 6.0.0-alpha.13 (2025-02-11)

### Frontend

#### Feature

- Add a `Summary` component used to render a content type for listings and teasers. @davisagli [#462](https://github.com/kitconcept/volto-light-theme/pull/462)
- Re-label the "Default" listing variation to "List" and the "Summary" variation to "List with images".
  (The internal names remain unchanged.) @davisagli [#462](https://github.com/kitconcept/volto-light-theme/pull/462)
- Add summary components to render the date for news items and events and the file type and size for files. @davisagli [#462](https://github.com/kitconcept/volto-light-theme/pull/462)

### Frontend

#### Bugfix

- Improve rendering of whole-day and open-ended event dates. @davisagli [#462](https://github.com/kitconcept/volto-light-theme/pull/462)

### Frontend

#### Internal

- Update to use 18.8.1 @sneridagh [#473](https://github.com/kitconcept/volto-light-theme/pull/473)

### Frontend

#### Documentation

- Update the order of the addon list so that the override order is correct. @kittauri [#470](https://github.com/kitconcept/volto-light-theme/pull/470)

## 6.0.0-alpha.12 (2025-02-04)

### Frontend

#### Bugfix

- Constrain logo proportions to 200x80. @kittauri [#467](https://github.com/kitconcept/volto-light-theme/pull/467)
- Improve the CSS around the logo. @sneridagh [#469](https://github.com/kitconcept/volto-light-theme/pull/469)

### Frontend

#### Internal

- Fix the `corepack`-armageddon of the last weekend. @sneridagh [#469](https://github.com/kitconcept/volto-light-theme/pull/469)

### Frontend

#### Documentation

- Add missing addons to the addons list in install.md @kittauri [#465](https://github.com/kitconcept/volto-light-theme/pull/465)

## 6.0.0-alpha.11 (2025-01-31)

### Frontend

#### Feature

- Added inner and outter logo container width and constraints. @sneridagh [#458](https://github.com/kitconcept/volto-light-theme/pull/458)
- Constrain logo proportions to 200x80. @sneridagh [#461](https://github.com/kitconcept/volto-light-theme/pull/461)

## 6.0.0-alpha.10 (2025-01-07)

### Frontend

#### Breaking

- Rename the name of the widget from `themingColorPicker` to `themeColorPicker`. @sneridagh [#455](https://github.com/kitconcept/volto-light-theme/pull/455)

### Frontend

#### Bugfix

- Removed the non-breaking space from the external URL icon, removing the strange underline. @Tishasoumya-02 [#438](https://github.com/kitconcept/volto-light-theme/pull/438)
- Improve usability of the theme color picker widget. Fix error when removing a logo. @sneridagh [#455](https://github.com/kitconcept/volto-light-theme/pull/455)

### Frontend

#### Internal

- Update to latest Volto 18.4.0. @sneridagh [#455](https://github.com/kitconcept/volto-light-theme/pull/455)

## 6.0.0-alpha.9 (2024-12-17)

### Frontend

#### Feature

- Added logos footer handlers for logo size and logos container size. Overall improvements for look and feel. @sneridagh [#451](https://github.com/kitconcept/volto-light-theme/pull/451)

### Frontend

#### Bugfix

- Remove teaser styling tab inside grids since it's empty. @sneridagh [#449](https://github.com/kitconcept/volto-light-theme/pull/449)
- Remove the last dangling `aspect-ratio` handler from image block. @sneridagh [#450](https://github.com/kitconcept/volto-light-theme/pull/450)

## 6.0.0-alpha.8 (2024-12-13)

### Frontend

#### Bugfix

- Remove the `aspect-ratio` handler by default in images and teasers. @sneridagh [#448](https://github.com/kitconcept/volto-light-theme/pull/448)

## 6.0.0-alpha.7 (2024-12-11)

### Frontend

#### Feature

- Image aspect-ratio handlers for Teaser/Image inside a grid. @sneridagh [#447](https://github.com/kitconcept/volto-light-theme/pull/447)

### Frontend

#### Bugfix

- Don't show image size and alignment settings for image block inside a grid. @danalvrz [#435](https://github.com/kitconcept/volto-light-theme/pull/435)

### Frontend

#### Documentation

- Update compatibility matrix. @sneridagh [#447](https://github.com/kitconcept/volto-light-theme/pull/447)

## 6.0.0-alpha.6 (2024-12-10)

### Frontend

#### Bugfix

- Fixed footerlinks error if the link is created but not set. @sneridagh [#445](https://github.com/kitconcept/volto-light-theme/pull/445)

## 6.0.0-alpha.5 (2024-12-09)

### Frontend

#### Bugfix

- Added guard in case blocks are corrupted or malformed. @sneridagh [#442](https://github.com/kitconcept/volto-light-theme/pull/442)

### Frontend

#### Internal

- Updated to latest 18.2.2 @sneridagh [#443](https://github.com/kitconcept/volto-light-theme/pull/443)

## 6.0.0-alpha.4 (2024-12-08)

### Frontend

#### Bugfix

- Fix initialBlocks config, do not override the whole thing. @sneridagh [#441](https://github.com/kitconcept/volto-light-theme/pull/441)

## 6.0.0-alpha.3 (2024-12-05)

### Frontend

#### Feature

- New look and feel specs for footer logos. @sneridagh
  Added two slots: `preFooter` and `postFooter`. [#437](https://github.com/kitconcept/volto-light-theme/pull/437)

### Frontend

#### Bugfix

- Fixed edge case when you delete the image content type from the site. @sneridagh [#437](https://github.com/kitconcept/volto-light-theme/pull/437)
- Fixed layout shift jumps on RAC Popovers. @sneridagh [#440](https://github.com/kitconcept/volto-light-theme/pull/440)

## 6.0.0-alpha.2 (2024-11-25)

### Frontend

#### Bugfix

- Fix Image block schema bug on creation. @sneridagh [#434](https://github.com/kitconcept/volto-light-theme/pull/434)

## 6.0.0-alpha.1 (2024-11-21)

### Frontend

#### Bugfix

- Change the pin type in `workspace` dependency declaration for `@plone/components`. @sneridagh

## 6.0.0-alpha.0 (2024-11-21)

### Frontend

#### Breaking

- New colors definitions
  New widths definitions
  Moved the Image block and the button block to use the new block width widget.
  The `full` image width now is really full width and spans from side to side of the viewport.
  Removed Container Query Polyfill configuration profile
  New Background widgets based in `@plone/components`
  @danalvrz @sneridagh [#420](https://github.com/kitconcept/volto-light-theme/pull/420)
- Remove deprecated Atoms (Container) components. @sneridagh [#433](https://github.com/kitconcept/volto-light-theme/pull/433)

### Frontend

#### Feature

- Add support for visual regression tests @reebalazs [#383](https://github.com/kitconcept/volto-light-theme/pull/383)
- Added `aspect-ratio` field to images.
  Added a new block width widget.
  Added optional footer links and footer logos (through custom content type behavior).
  Added `aboveHeader` slot renderer (it holds the new `Theming` slot).
  @danalvrz @sneridagh [#420](https://github.com/kitconcept/volto-light-theme/pull/420)

### Frontend

#### Internal

- Get rid of all imports from Volto barrel files.
  Added a rule to enforce not to import from `@plone/volto/components`, `@plone/volto/helpers` or `@plone/volto/actions`. @sneridagh [#418](https://github.com/kitconcept/volto-light-theme/pull/418)
- Update to Volto 18a46 @sneridagh [#419](https://github.com/kitconcept/volto-light-theme/pull/419)

### Frontend

#### Documentation

- Add standard documentation @sneridagh [#423](https://github.com/kitconcept/volto-light-theme/pull/423)

## 5.0.1 (2024-10-09)

### Frontend

#### Bugfix

- Fixed missing key in header @sneridagh [#417](https://github.com/kitconcept/volto-light-theme/pull/417)

### Frontend

#### Internal

- Update versions to latest volto-highlight-block, volto-button-block @sneridagh [#408](https://github.com/kitconcept/volto-light-theme/pull/408)
- Bump `volto-button-block` version @sneridagh
  Bump to Volto 18.0.0-alpha.45 [#417](https://github.com/kitconcept/volto-light-theme/pull/417)

## 5.0.0 (2024-07-02)

### Frontend

#### Breaking

- Upgrade to a39, enable new image widget @sneridagh

  Breaking:
    The new Image widget component is used in the VLT shadowed image component.
    The minimum Volto version requirements have changed for this reason.
    The new image widget is present in core from these versions on:
      - Volto 17.18.0
      - Volto 18.0.0-alpha.36

    For more information, please take a look at the upgrade guide:
    https://github.com/kitconcept/volto-light-theme/blob/main/UPGRADE-GUIDE.md [#405](https://github.com/kitconcept/volto-light-theme/pull/405)

## 4.0.1 (2024-06-28)

### Frontend

#### Bugfix

- Fix Invalid html structure in caption component @iRohitSingh [#398](https://github.com/kitconcept/volto-light-theme/pull/398)
- Fix install in Volto 17 @sneridagh [#400](https://github.com/kitconcept/volto-light-theme/pull/400)

### Frontend

#### Internal

- Upgrade to Volto 18a37 @sneridagh [#403](https://github.com/kitconcept/volto-light-theme/pull/403)

## 4.0.0 (2024-06-21)

### Frontend

#### Breaking

- Fix tabbing order in the top header. It modifies the underlying HTML to move the top header to the bottom, and modifies CSS to adjust. @iRohitSingh @sneridagh [#374](https://github.com/kitconcept/volto-light-theme/pull/374)
- Updated the MobileNavigation component to be more easily customizable.
  The component can now handle infinite navigation depth instead of only three levels, if configured to do so.
  The Burger Menu can now be easily customized by overriding the new MobileNavigationToggler.jsx file.
  @lenadax

  Breaking:
  - The "hamburger" icon in the mobile navigation now has an additional wrapper that allows for better customization.

  If you have overriden the hamburger icon, you should make sure that your customizations still work and adjust otherwise. [#393](https://github.com/kitconcept/volto-light-theme/pull/393)

### Frontend

#### Bugfix

- Fix Logo alt-Title @jonaspiterek [#337](https://github.com/kitconcept/volto-light-theme/pull/337)
- fix link in introduction block being smaller than normal text @jonaspiterek [#365](https://github.com/kitconcept/volto-light-theme/pull/365)
- Fix Description block width in Edit and Add mode. @danalvrz [#394](https://github.com/kitconcept/volto-light-theme/pull/394)

### Frontend

#### Internal

- Update the setup. Use new images. @sneridagh [#390](https://github.com/kitconcept/volto-light-theme/pull/390)

## 3.3.2 (2024-05-31)

### Frontend

#### Bugfix

- Add top padding to login page @danalvrz [#387](https://github.com/kitconcept/volto-light-theme/pull/387)
- Add default width mixin to content creation Forms @danalvrz [#388](https://github.com/kitconcept/volto-light-theme/pull/388)

## 3.3.1 (2024-05-30)

### Frontend

#### Bugfix

- Fix image grid clossure issues in inlined JSX method when selecting an image after uploading another image in another grid element @sneridagh [#389](https://github.com/kitconcept/volto-light-theme/pull/389)

## 3.3.0 (2024-04-26)

### Frontend

#### Feature

- Make font-weights, font-sizes and font-heights overrideable adding the `!default` thingy @erral [#371](https://github.com/kitconcept/volto-light-theme/pull/371)

### Frontend

#### Bugfix

- Fix event title margin bottom. @iFlameing [#357](https://github.com/kitconcept/volto-light-theme/pull/357)
- Fix Image block in grid is not working @iRohitSingh [#376](https://github.com/kitconcept/volto-light-theme/pull/376)

## 3.2.0 (2024-03-25)

### Frontend

#### Feature

- Use project-less approach for developing @sneridagh [#369](https://github.com/kitconcept/volto-light-theme/pull/369)

### Frontend

#### Bugfix

- Revert breaking change introduced in #346 @sneridagh [#373](https://github.com/kitconcept/volto-light-theme/pull/373)

## 3.1.2 (2024-03-18)

### Frontend

#### Internal

- Remove @plone/volto peerDepencency @sneridagh [#364](https://github.com/kitconcept/volto-light-theme/pull/364)
- Add types declarations to make TS happy @sneridagh [#367](https://github.com/kitconcept/volto-light-theme/pull/367)

## 3.1.1 (2024-03-08)

### Frontend

#### Bugfix

- Fix typo in container deprecation notice @sneridagh [#362](https://github.com/kitconcept/volto-light-theme/pull/362)

## 3.1.0 (2024-03-08)

### Frontend

#### Feature

- [Vertical Spacing] Reduce spacing between title and description in teaser block @iFlameing [#353](https://github.com/kitconcept/volto-light-theme/pull/353)
- Add eu and es translations @erral [#358](https://github.com/kitconcept/volto-light-theme/pull/358)

### Frontend

#### Bugfix

- Fix header tabbing order @iRohitSingh [#251](https://github.com/kitconcept/volto-light-theme/pull/251)
- Fix show figcaption tag if ther is no caption @iRohitSingh [#350](https://github.com/kitconcept/volto-light-theme/pull/350)
- Safer pass by value instead of by reference when modifying internal `blockConfig` data @sneridagh [#361](https://github.com/kitconcept/volto-light-theme/pull/361)

### Frontend

#### Internal

- @plone/components as dependency
  Use the `Container` component from @plone/components instead of the local one.
  The one in `src/components/Atoms/Container/Container.jsx` is deprecated and will be removed in the next major release. @sneridagh [#360](https://github.com/kitconcept/volto-light-theme/pull/360)

## 3.0.1 (2024-03-04)

### Frontend

#### Bugfix

- Fix image gallery opacity. @robgietema [#347](https://github.com/kitconcept/volto-light-theme/pull/347)
- Fix teaser styles on add view. @davisagli [#354](https://github.com/kitconcept/volto-light-theme/pull/354)

### Frontend

#### Internal

- Update to Volto 17.15.1 @sneridagh [#348](https://github.com/kitconcept/volto-light-theme/pull/348)

## 3.0.0 (2024-02-14)

### Frontend

#### Feature

- Add options to show intranet label and implement intranet header for intranet sites. @iFlameing [#304](https://github.com/kitconcept/volto-light-theme/pull/304)
- Add Event Metadata block @iRohitSingh [#334](https://github.com/kitconcept/volto-light-theme/pull/334)

### Frontend

#### Bugfix

- Fix Navigation fails html validator due to use of divs inside ul tag @iRohitSingh [#289](https://github.com/kitconcept/volto-light-theme/pull/289)
- Fixed the Caption for Images, Video Blocks etc. to use semantically correct HTML Structure @Molochem [#341](https://github.com/kitconcept/volto-light-theme/pull/341)
- Fix missing key in `Header` component @sneridagh [#345](https://github.com/kitconcept/volto-light-theme/pull/345)

### Frontend

#### Internal

- Support for enhanced initial blocks in config - Update to Volto 17.12.1 @sneridagh [#342](https://github.com/kitconcept/volto-light-theme/pull/342)

## 3.0.0-alpha.3 (2024-02-02)

### Frontend

#### Feature

- Allow customizing the secondary navigation entries via Portal action. @iFlameing [#302](https://github.com/kitconcept/volto-light-theme/pull/302)

### Frontend

#### Bugfix

- Fix Fat menu A11y issues @iRohitSingh [#264](https://github.com/kitconcept/volto-light-theme/pull/264)
- Fix Introduction-Block inline-styles have wrong typography. @iFlameing [#314](https://github.com/kitconcept/volto-light-theme/pull/314)
- Remove extra site-map from header @iRohitSingh [#339](https://github.com/kitconcept/volto-light-theme/pull/339)

### Frontend

#### Internal

- Upgrade to Volto 17.11.2 and Plone 6.0.9 @sneridagh [#328](https://github.com/kitconcept/volto-light-theme/pull/328)
- Upgrade to Votlo 17.11.5 and Plone 6.0.9 @sneridagh [#331](https://github.com/kitconcept/volto-light-theme/pull/331)

## 3.0.0-alpha.2 (2024-01-17)

### Frontend

#### Breaking

- Color background go to full-width now instead of snapping to 1440. @sneridagh
  See decision in https://github.com/kitconcept/volto-light-theme/issues/323 [#323](https://github.com/kitconcept/volto-light-theme/pull/323)

### Frontend

#### Bugfix

- Fix Responsive breakpoints have gaps for navigation @iRohitSingh [#265](https://github.com/kitconcept/volto-light-theme/pull/265)
- Replaced static values of spacing mixins with variables @ichim-david [#286](https://github.com/kitconcept/volto-light-theme/pull/286)
- Fix paragraph in edit mode is not reflected in view mode of Introduction
  Block @iRohitSingh [#324](https://github.com/kitconcept/volto-light-theme/pull/324)
- Increase BlocksChooser index higher than the sidebar one. @sneridagh [#327](https://github.com/kitconcept/volto-light-theme/pull/327)

### Frontend

#### Internal

- Add Search icon is missing on tablet & mobile screen sizes @iRohitSingh [#266](https://github.com/kitconcept/volto-light-theme/pull/266)

## 3.0.0-alpha.1 (2024-01-02)

### Frontend

#### Breaking

- Change the Language Selector to only display the first 2 Characters of each Language @Molochem [#321](https://github.com/kitconcept/volto-light-theme/pull/321)

### Frontend

#### Feature

- Added a11y tests infrastructure @sneridagh [#300](https://github.com/kitconcept/volto-light-theme/pull/300)

### Frontend

#### Bugfix

- Fix wrong styling for all the groups by background in view mode @sneridagh
  Added style support for Image block @sneridagh
  Added style support for Listing block @sneridagh [#322](https://github.com/kitconcept/volto-light-theme/pull/322)

## 3.0.0-alpha.0 (2023-12-27)

### Frontend

#### Breaking

- Upgraded the dependency on `@kitconcept/volto-slider-block` to use `6.0.0`.

  This is a drop-in replacement, so no action is required for the existing slider blocks you may have already in your sites.
  However, the CSS classes of the structural slider block elements changed in this version.
  The inner (visible objects) CSS classes remain unchanged.
  If you have customized them in your project, you may have to update them, although the structural class names are rarely customized aside from vertical spacing properties.
  They are mapped 1:1 with the previous ones, following this table correspondence:

  | Old className   | New className    |
  | --------------- | ---------------- |
  | slick-slider    | slider-wrapper   |
  | slick-list      | slider-viewport  |
  | slick-track     | slider-container |
  | slick-slide     | slider-slide     |
  | slick-arrow     | slider-button    |
  | slick-prev      | slider-button-prev |
  | slick-next      | slider-slide-next  |
  | slick-next      | slider-slide-next  |
  | slick-dots      | slider-dots      |
  | slick-dot       | slider-dot       |

  For more information, please check the https://github.com/kitconcept/volto-slider-block/blob/main/README.md [#288](https://github.com/kitconcept/volto-light-theme/pull/288)

### Frontend

#### Bugfix

- Fix showing up uploaded logo from site controlpanel. @iFlameing [#291](https://github.com/kitconcept/volto-light-theme/pull/291)
- Un-pin `eslint-plugin-jsx-a11y` version @sneridagh [#299](https://github.com/kitconcept/volto-light-theme/pull/299)
- Fix Blocks chooser styling @iRohitSingh [#307](https://github.com/kitconcept/volto-light-theme/pull/307)
- Remove id selector from listings because of css specificity @steffenri [#309](https://github.com/kitconcept/volto-light-theme/pull/309)
- Fix margins of h1 in sitemap view @steffenri [#312](https://github.com/kitconcept/volto-light-theme/pull/312)
- Fix homepage link for all language codes (#298) @steffenri [#313](https://github.com/kitconcept/volto-light-theme/pull/313)

### Frontend

#### Internal

- Upgrade slider to 6.1.0 @sneridagh [#316](https://github.com/kitconcept/volto-light-theme/pull/316)

## 2.1.0 (2023-12-13)

### Frontend

#### Feature

- Added Image Gallery Listing Metadata @robgietema [#127](https://github.com/kitconcept/volto-light-theme/pull/127)
- Add Brazilian Portuguese translation [@ericof] [#294](https://github.com/kitconcept/volto-light-theme/pull/294)

### Frontend

#### Bugfix

- Also clean up Navigation PropTypes @fredvd [#272b](https://github.com/kitconcept/volto-light-theme/pull/272b)
- Fix css of External link icon indicator @iRohitSingh [#91](https://github.com/kitconcept/volto-light-theme/pull/91)
- Fix css of Sitemap @iRohitSingh [#209](https://github.com/kitconcept/volto-light-theme/pull/209)
- Fixed css errors in the header and image scss files @ichim-david
  All the mobile menu items are now links @ichim-david
  Close buttons are now tabbable @ichim-david
  Close menu when hitting the escape key @ichim-david [#264](https://github.com/kitconcept/volto-light-theme/pull/264)
- Use only one set of values for container widths which can be modified from variables @ichim-david [#265](https://github.com/kitconcept/volto-light-theme/pull/265)
- Update contentMetadataTagsImageField settings to use preview_image field.  @iRohitSingh [#274](https://github.com/kitconcept/volto-light-theme/pull/274)
- Removed the "overview" React Message from Fat Menu @Molochem [#276](https://github.com/kitconcept/volto-light-theme/pull/276)
- Moved custom font loading to a separate fonts.scss @ichim-david
  Added variable definitions for loading the cms font instead of hard-coding to Metropolis @ichim-david [#279](https://github.com/kitconcept/volto-light-theme/pull/279)
- Minor style fixes for hamburger menu icon @danalvrz [#281](https://github.com/kitconcept/volto-light-theme/pull/281)
- Don't force aspect ratio for the Image content type view @iRohitSingh [#293](https://github.com/kitconcept/volto-light-theme/pull/293)

### Frontend

#### Internal

- Run CI workflows for external PRs. @davisagli [#271](https://github.com/kitconcept/volto-light-theme/pull/271)
- Remove old code from navigation component @steffenri [#272](https://github.com/kitconcept/volto-light-theme/pull/272)
- Remove Hero Block @iRohitSingh [#278](https://github.com/kitconcept/volto-light-theme/pull/278)

## 2.0.0 (2023-11-16)

### Frontend

#### Breaking

- Added fat menu and mobile menu. @iFlameing
  Since 2.0.0, the light theme has a fat menu (below the main site sections) triggered clickin on one of them.
  It's behind a feature flag, as opt-out:

  ```js
  config.settings.enableFatMenu = true;
  ``` [#86](https://github.com/kitconcept/volto-light-theme/pull/86)

### Frontend

#### Feature

- Added Focus and Hover Attributes to UI Buttons @Molochem [#260](https://github.com/kitconcept/volto-light-theme/pull/260)

### Frontend

#### Bugfix

- Fix max height for full width map iframe @danalvrz [#257](https://github.com/kitconcept/volto-light-theme/pull/257)
- Fix header alignment of the sections @sneridagh [#261](https://github.com/kitconcept/volto-light-theme/pull/261)

### Frontend

#### Internal

- Update to latest Plone and Volto @sneridagh
  Pin `volto-slider-block` to 5.1.1 [#262](https://github.com/kitconcept/volto-light-theme/pull/262)

## 1.0.1 (2023-10-18)

### Frontend

#### Bugfix

- Small CSS adjustments @sneridagh [#249](https://github.com/kitconcept/volto-light-theme/pull/249)

### Frontend

#### Internal

- Update to Volto 17 final @sneridagh [#246](https://github.com/kitconcept/volto-light-theme/pull/246)
- Bump Volto version @sneridagh [#249](https://github.com/kitconcept/volto-light-theme/pull/249)


## 1.0.0 (2023-09-29)

### Frontend

#### Feature

- Update to use the proper linter versions and correct violations @sneridagh [#245](https://github.com/kitconcept/volto-light-theme/pull/245)

### Frontend

#### Bugfix

- Upgrade highlight to 3.0.0 and downgrade Plone to 6.0.6 @sneridagh [#244](https://github.com/kitconcept/volto-light-theme/pull/244)


## 1.0.0-rc.20 (2023-09-28)

### Frontend

#### Feature

- Add volto-highlight-block @sneridagh [#243](https://github.com/kitconcept/volto-light-theme/pull/243)


## 1.0.0-rc.19 (2023-09-28)

### Frontend

#### Bugfix

- Remove too large margins on listing blocks @steffenri [#239](https://github.com/kitconcept/volto-light-theme/pull/239)
- Fix font sizes of one element in grids for edit mode @sneridagh [#241](https://github.com/kitconcept/volto-light-theme/pull/241)
- Update to latest accordion-block, some fixes @sneridagh [#242](https://github.com/kitconcept/volto-light-theme/pull/242)


## 1.0.0-rc.18 (2023-09-25)

### Frontend

#### Feature

- Add button and flagAlign in slider block @iRohitSingh [#37](https://github.com/kitconcept/volto-light-theme/pull/37)
- Upgrade to Volto 17a27 @sneridagh [#232](https://github.com/kitconcept/volto-light-theme/pull/232)
- Add kitconcept branding @sneridagh
  Add link to GitHub repo @sneridagh [#233](https://github.com/kitconcept/volto-light-theme/pull/233)

### Frontend

#### Bugfix

- Fix aspect ratio in slider @sneridagh [#233](https://github.com/kitconcept/volto-light-theme/pull/233)
- Fix form inputs height, transfer the height property to the parent .ui.input instead of the input itself, which behaves wrong. @sneridagh [#234](https://github.com/kitconcept/volto-light-theme/pull/234)
- Fix anontools in header, convert it to functional @sneridagh [#236](https://github.com/kitconcept/volto-light-theme/pull/236)


## 1.0.0-rc.17 (2023-09-18)

### Frontend

#### Feature

- Upgrade to Volto 17a26 - Fix i18n - Upgrade Cypress 13 @sneridagh [#229](https://github.com/kitconcept/volto-light-theme/pull/229)
- Upgrade volto-heading-block version @sneridagh [#230](https://github.com/kitconcept/volto-light-theme/pull/230)

### Frontend

#### Bugfix

- Fix css for showing external link icon. @iFlameing [#19](https://github.com/kitconcept/volto-light-theme/pull/19)
- Remove extra config from table block @iFlameing. [#91](https://github.com/kitconcept/volto-light-theme/pull/91)
- Fix `dates` bottom margin for News Item in mobile. @danalvrz
  Fix margins for Image block. @danalvrz
  Fix margins for Video block. @danalvrz
  Fix block title margin for Listing in Edit. @danalvrz
  Fix block title margin for Grid in Edit. @danalvrz
  Fix margin for Heading block in Edit. @danalvrz
  Fix margins for Separator in Edit. @danalvrz
  Fix margins for Maps block. @danalvrz [#220](https://github.com/kitconcept/volto-light-theme/pull/220)
- Write cypress test for the listing Grid variation. @iFlameing [#221](https://github.com/kitconcept/volto-light-theme/pull/221)
- Add acceptance test for maps block @iFlameing. [#223](https://github.com/kitconcept/volto-light-theme/pull/223)
- Fix mismatch of event view with Figma. @iFlameing [#226](https://github.com/kitconcept/volto-light-theme/pull/226)
- Fix a11y violation in File view. @iFlameing [#227](https://github.com/kitconcept/volto-light-theme/pull/227)


## 1.0.0-rc.16 (2023-08-15)

### Frontend

#### Bugfix

- Add icons and default image customizations, fix other small image sizing issues for Listings, fix spacing issues for Search block. @danalvrz [#207](https://github.com/kitconcept/volto-light-theme/pull/207)
- Fix font-size of alt text description. @iFlameing [#217](https://github.com/kitconcept/volto-light-theme/pull/217)
- Fix unconditional Register link in header. @fredvd [#219](https://github.com/kitconcept/volto-light-theme/pull/219)


## 1.0.0-rc.15 (2023-08-09)

### Frontend

#### Bugfix

- Update the recommended version of volto-separator-block to 4.0.0. @davisagli [#211](https://github.com/kitconcept/volto-light-theme/pull/211)
- ToC block fixes (remove most fields from the block, add default styling
  schema, fix width in edit mode). @davisagli [#212](https://github.com/kitconcept/volto-light-theme/pull/212)
- Hide unnecessary Search block fields. @danalvrz [#213](https://github.com/kitconcept/volto-light-theme/pull/213)
- Upgrade to Volto 17-0.0-alpha.24. @davisagli [#214](https://github.com/kitconcept/volto-light-theme/pull/214)


## 1.0.0-rc.14 (2023-08-08)

### Frontend

#### Feature

- Hide change note field. @davisagli [#206](https://github.com/kitconcept/volto-light-theme/pull/206)

### Frontend

#### Bugfix

- Remove external link icon from ICS download button event content type @iRohitSingh [#201](https://github.com/kitconcept/volto-light-theme/pull/201)
- Fix teaser right align is not aligned to right side of page @iFlameing. [#202](https://github.com/kitconcept/volto-light-theme/pull/202)
- Add missing german translations @steffenri [#205](https://github.com/kitconcept/volto-light-theme/pull/205)


## 1.0.0-rc.13 (2023-08-03)

### Frontend

#### Bugfix

- Add external link for slate block @iRohitSingh [#188](https://github.com/kitconcept/volto-light-theme/pull/188)
- Fix responsive of listing block. @iFlameing [#189](https://github.com/kitconcept/volto-light-theme/pull/189)
- Fix pagination styles for Listings. @danalvrz

  Change divider bar in News Item head title from string to pseudo-element. @danalvrz

  Fix text decoration for links. @danalvrz

  Fix background color for in-Grid Slate. @danalvrz

  Fix Image block margins. @danalvrz

  Fix Grid Listing variation CSS. @danalvrz

  Fix Separator margin when preceded by Image block. @danalvrz

  Fix Teaser margin in mobile. @danalvrz [#191](https://github.com/kitconcept/volto-light-theme/pull/191)
- Enable automatic hyphenation. @iFlameing [#193](https://github.com/kitconcept/volto-light-theme/pull/193)
- Upgrade to Volto 17.0.0-alpha.23 @davisagli [#195](https://github.com/kitconcept/volto-light-theme/pull/195)
- Fix image rights @iFlameing. [#197](https://github.com/kitconcept/volto-light-theme/pull/197)
- Fix aspect-ratio and add rule to center object position for all images. @danalvrz [#199](https://github.com/kitconcept/volto-light-theme/pull/199)


## 1.0.0-rc.12 (2023-07-28)

### Frontend

#### Feature

- Upgrade to Volto 17a22. @davisagli [#186](https://github.com/kitconcept/volto-light-theme/pull/186)

### Frontend

#### Bugfix

- Fix responsive font sizing for headings. @danalvrz [#182](https://github.com/kitconcept/volto-light-theme/pull/182)
- Fix map block. @iFlameing [#183](https://github.com/kitconcept/volto-light-theme/pull/183)


## 1.0.0-rc.11 (2023-07-28)

### Frontend

#### Breaking

- Update to Volto 17a21
  Deprecate volto-image-block
  Use new core Image component
  @sneridagh [#177](https://github.com/kitconcept/volto-light-theme/pull/177)


## 1.0.0-rc.10 (2023-07-26)

### Frontend

#### Bugfix

- Fix styles for blocks inside the Accordion block. @danalvrz [#146](https://github.com/kitconcept/volto-light-theme/pull/146)
- Fix styles for Search block's results default and summary listings. @danalvrz [#168](https://github.com/kitconcept/volto-light-theme/pull/168)
- Fix container problem of Event View @iFlameing [#170](https://github.com/kitconcept/volto-light-theme/pull/170)
- Add missing translation. @danalvrz [#172](https://github.com/kitconcept/volto-light-theme/pull/172)
- Fix contained block editor wrapper (for listings) @sneridagh [#173](https://github.com/kitconcept/volto-light-theme/pull/173)
- Update volto-button-block to 2.3.1 @steffenri [#174](https://github.com/kitconcept/volto-light-theme/pull/174)
- Update Table block to contain styling fieldset and css fix. @iFlameing [#175](https://github.com/kitconcept/volto-light-theme/pull/175)
- Remove levels choices h1,h4,h5 and h6 from Toc block @iRohitSingh [#178](https://github.com/kitconcept/volto-light-theme/pull/178)
- Fix responsiveness of video block. @iFlameing [#180](https://github.com/kitconcept/volto-light-theme/pull/180)
- Fixed responsive spacings & font sizes for mobile screens. @danalvrz [#181](https://github.com/kitconcept/volto-light-theme/pull/181)


## 1.0.0-rc.9 (2023-07-19)

### Frontend

#### Breaking

- Refactor existing customizations, removing the ones no longer needed (because they are present in Volto already) and using the new pattern in the others. Volto 17a20 is required in order to retain consistency. @sneridagh [#166](https://github.com/kitconcept/volto-light-theme/pull/166)

### Frontend

#### Bugfix

- Fix NewsItemView as wella sd Link View @iFlameing [#127](https://github.com/kitconcept/volto-light-theme/pull/127)
- Fix Image View in edit mode @iFlameing. [#154](https://github.com/kitconcept/volto-light-theme/pull/154)
- Update volto-image-block @sneridagh [#159](https://github.com/kitconcept/volto-light-theme/pull/159)
- Fix File View implementation @iFlameing [#162](https://github.com/kitconcept/volto-light-theme/pull/162)

### Frontend

#### Internal

- Upgrade volto-image-block to fix the image upload @sneridagh [#149](https://github.com/kitconcept/volto-light-theme/pull/149)
- Upgrade to Volto 17a20 @sneridagh [#163](https://github.com/kitconcept/volto-light-theme/pull/163)
- Remove the `apiExpanders` existing locally in the package since it's already in Volto 17a20 @sneridagh [#164](https://github.com/kitconcept/volto-light-theme/pull/164)


## 1.0.0-rc.8 (2023-07-14)

### Frontend

#### Bugfix

- Fix Image content type @iRohitSingh [#18](https://github.com/kitconcept/volto-light-theme/pull/18)
- Fix a11y issues in EventView @steffenri [#147](https://github.com/kitconcept/volto-light-theme/pull/147)
- Remove typo in fileview @steffenri [#148](https://github.com/kitconcept/volto-light-theme/pull/148)

### Frontend

#### Documentation

- Documentation on local docker development - local ESlint working @sneridagh [#144](https://github.com/kitconcept/volto-light-theme/pull/144)


## 1.0.0-rc.7 (2023-07-13)

### Frontend

#### Bugfix

- Fix File content type @iRohitSingh [#17](https://github.com/kitconcept/volto-light-theme/pull/17)
- Add idiomatic order CSS package @sneridagh
  Fix margin in edit mode for all blocks @sneridagh [#142](https://github.com/kitconcept/volto-light-theme/pull/142)
- Fix CSS for Accordion block. @danalvrz [#143](https://github.com/kitconcept/volto-light-theme/pull/143)


## 1.0.0-rc.6 (2023-07-12)

### Frontend

#### Bugfix

- Fix Event content type @iRohitSingh [#16](https://github.com/kitconcept/volto-light-theme/pull/16)
- Fix local linting, add proper eslintignore @sneridagh [#139](https://github.com/kitconcept/volto-light-theme/pull/139)
- Minor fix for Listing margins. @danalvrz [#140](https://github.com/kitconcept/volto-light-theme/pull/140)
- Fix gutter for grids for small screens. Improve overall margins calculations for all blocks in the content area. @sneridagh [#141](https://github.com/kitconcept/volto-light-theme/pull/141)


## 1.0.0-rc.5 (2023-07-11)

### Frontend

#### Breaking

- Move the container query polyfill to an add-on profile, disabled by default @sneridagh [#137](https://github.com/kitconcept/volto-light-theme/pull/137)

### Frontend

#### Feature

- Upgrade to Volto 17a17 as baseline @sneridagh [#136](https://github.com/kitconcept/volto-light-theme/pull/136)
- Add acceptance tests layer, update docker files and Makefile @sneridagh [#137](https://github.com/kitconcept/volto-light-theme/pull/137)

### Frontend

#### Bugfix

- Check if the separator is present before enhancing it @sneridagh [#138](https://github.com/kitconcept/volto-light-theme/pull/138)


## 1.0.0-rc.4 (2023-07-11)

### Frontend

#### Bugfix

- Fix Teaser block CSS. @danalvrz [#134](https://github.com/kitconcept/volto-light-theme/pull/134)


## 1.0.0-rc.3 (2023-07-10)

### Frontend

#### Breaking

- Remove `@kitconcept/volto-blocks-grid` dependency @sneridagh [#131](https://github.com/kitconcept/volto-light-theme/pull/131)

### Frontend

#### Bugfix

- Fix minor style bugs for Listing block @danalvrz [#130](https://github.com/kitconcept/volto-light-theme/pull/130)

### Frontend

#### Internal

- Create deploy to https://light-theme.kitconcept.io [@ericof] [#72](https://github.com/kitconcept/volto-light-theme/pull/72)


## 1.0.0-rc.2 (2023-07-07)

### Frontend

#### Bugfix

- Add NewsItemView @iFlamieng [#127](https://github.com/kitconcept/volto-light-theme/pull/127)
- Add support for margins in responsive. Improve the spacing in grids. @sneridagh [#129](https://github.com/kitconcept/volto-light-theme/pull/129)


## 1.0.0-rc.1 (2023-07-05)

### Frontend

#### Bugfix

- Fix css issue of image block full width variante @iFlameing [#115](https://github.com/kitconcept/volto-light-theme/pull/115)
- Fix minor style bugs in several components. @danalvrz [#122](https://github.com/kitconcept/volto-light-theme/pull/122)


## 1.0.0-rc.0 (2023-06-29)

### Frontend

#### Feature

- Adding StyleWrapperStyles extender @sneridagh [#54](https://github.com/kitconcept/volto-light-theme/pull/54)
- Backporting listing customizations from dlr. @iRohitSingh [#55](https://github.com/kitconcept/volto-light-theme/pull/55)
- Backport of Search Block from Dlr @iFlameing [#56](https://github.com/kitconcept/volto-light-theme/pull/56)
- Add apiExpanders @sneridagh [#65](https://github.com/kitconcept/volto-light-theme/pull/65)
- Add entry points to the theme for allowing another add-on to customize it @sneridagh [#71](https://github.com/kitconcept/volto-light-theme/pull/71)
- Add support for mermaidBlock and table @sneridagh [#72](https://github.com/kitconcept/volto-light-theme/pull/72)
- Add declarative theme support @sneridagh [#73](https://github.com/kitconcept/volto-light-theme/pull/73)
- New testing infrastructure @sneridagh [#75](https://github.com/kitconcept/volto-light-theme/pull/75)
- Add font patterns @danalvrz [#76](https://github.com/kitconcept/volto-light-theme/pull/76)
- Removes `ListingBody` component customization, since it is redundant now, update the `DefaultTemplate` for Listing block @sneridagh [#80](https://github.com/kitconcept/volto-light-theme/pull/80)
- Add auto block grouping per backgroundColor @sneridagh [#83](https://github.com/kitconcept/volto-light-theme/pull/83)
- Customize SummaryTemplate to render dynamic ItemBodyTemplates from the registry, depending on the item's type @danalvrz [#86](https://github.com/kitconcept/volto-light-theme/pull/86)
- Refactor customizations, add comments everywhere, customizations as a proxy to components in light theme to allow selective customizations in the theme not in Volto itself. @sneridagh [#88](https://github.com/kitconcept/volto-light-theme/pull/88)
- Enable background color styling for slate blocks using the autogrouping @sneridagh [#89](https://github.com/kitconcept/volto-light-theme/pull/89)
- Add Grid listing variation @danalvrz [#91](https://github.com/kitconcept/volto-light-theme/pull/91)
- Add accordion @sneridagh [#108](https://github.com/kitconcept/volto-light-theme/pull/108)
- Prepare to release @sneridagh
  Add support for core Grid block @sneridagh [#119](https://github.com/kitconcept/volto-light-theme/pull/119)

### Frontend

#### Bugfix

- Fix css of Table of Contents block @iRohitSingh [#35](https://github.com/kitconcept/volto-light-theme/pull/35)
- Remove style enhancer for separator block from theme  @danalvrz [#39](https://github.com/kitconcept/volto-light-theme/pull/39)
- Add temporary fix for images in teasers until https://github.com/kitconcept/volto-light-theme/issues/40 is fixed. @sneridagh [#43](https://github.com/kitconcept/volto-light-theme/pull/43)
- Fix breadcrumbs in ObjectBrowser, add new Container @sneridagh [#45](https://github.com/kitconcept/volto-light-theme/pull/45)
- Minor padding fix in header @danalvrz [#47](https://github.com/kitconcept/volto-light-theme/pull/47)
- Fix stylelint @sneridagh [#48](https://github.com/kitconcept/volto-light-theme/pull/48)
- Fix grids in edit mode @sneridagh [#49](https://github.com/kitconcept/volto-light-theme/pull/49)
- Remove for now a selector definition that is making leak the grey background in all slate blocks grid or not grid @sneridagh [#50](https://github.com/kitconcept/volto-light-theme/pull/50)
- Fix h1 width to use default instead of layout @sneridagh [#51](https://github.com/kitconcept/volto-light-theme/pull/51)
- Relocate slate selector, and headline margin fix, for grid block @danalvrz [#52](https://github.com/kitconcept/volto-light-theme/pull/52)
- Add footer site as backend actions, fix translations @sneridagh [#53](https://github.com/kitconcept/volto-light-theme/pull/53)
- Some grid fixes for top padding @sneridagh [#57](https://github.com/kitconcept/volto-light-theme/pull/57)
- Added rule to align hamburger menu to the right when in mobile screen @danalvrz [#58](https://github.com/kitconcept/volto-light-theme/pull/58)
- Minor width fix to separator full variant @danalvrz [#59](https://github.com/kitconcept/volto-light-theme/pull/59)
- Fix styles for introduction block @danalvrz [#61](https://github.com/kitconcept/volto-light-theme/pull/61)
- Remove Title as required block. Fix the single image use case in a grid @sneridagh [#62](https://github.com/kitconcept/volto-light-theme/pull/62)
- Add style to Button block @iRohitSingh [#63](https://github.com/kitconcept/volto-light-theme/pull/63)
- Update grid block style @danalvrz
  Fix css of Right aligned teaser on view mode @iRohitSingh [#66](https://github.com/kitconcept/volto-light-theme/pull/66)
- Minor spacing fix for teaser block @danalvrz [#67](https://github.com/kitconcept/volto-light-theme/pull/67)
- Add bottom margin to introduction block @danalvrz [#69](https://github.com/kitconcept/volto-light-theme/pull/69)
- Fix ListingBody to display headline property @danalvrz [#78](https://github.com/kitconcept/volto-light-theme/pull/78)
- Add Heading-Block to required blocks list in README @danalvrz [#79](https://github.com/kitconcept/volto-light-theme/pull/79)
- Fix variables order, add !default to all theme vars @sneridagh [#81](https://github.com/kitconcept/volto-light-theme/pull/81)
- Fix grid teasers full height @sneridagh [#85](https://github.com/kitconcept/volto-light-theme/pull/85)
- Fix absolute elements in containers @sneridagh [#87](https://github.com/kitconcept/volto-light-theme/pull/87)
- Fixes in grids and support for the Volto 17 and volto-blocks-grid popperjs based blockschooser @sneridagh [#89](https://github.com/kitconcept/volto-light-theme/pull/89)
- Change component name to SummaryListingItemTemplate @danalvrz [#92](https://github.com/kitconcept/volto-light-theme/pull/92)
- Fix priority for the toolbar and the containers @sneridagh [#93](https://github.com/kitconcept/volto-light-theme/pull/93)
- Fix contents view, add horizontal scrolling @sneridagh [#94](https://github.com/kitconcept/volto-light-theme/pull/94)
- Fix autogrouping flaw, defaulting to transparent in case that there is no backgroundColor information set @sneridagh [#96](https://github.com/kitconcept/volto-light-theme/pull/96)
- Transparent by default in classname. Vertical spacing, using margin-bottom as reference. Grids. @sneridagh [#97](https://github.com/kitconcept/volto-light-theme/pull/97)
- Fix styles for standalone teaser and grid-teaser-item @danalvrz [#98](https://github.com/kitconcept/volto-light-theme/pull/98)
- Remove 'wide' from inner-alignment actions @danalvrz [#100](https://github.com/kitconcept/volto-light-theme/pull/100)
- Adjustments to grids and various @sneridagh [#101](https://github.com/kitconcept/volto-light-theme/pull/101)
- Fix values for the agreed vertical spacing between color blocks. Other minor adjustments. @sneridagh [#109](https://github.com/kitconcept/volto-light-theme/pull/109)
- Fix styles for in-grid Slate block @danalvrz [#110](https://github.com/kitconcept/volto-light-theme/pull/110)
- Fix styles for in-grid Images. @danalvrz [#111](https://github.com/kitconcept/volto-light-theme/pull/111)
- Fix grid image block css @iFlameing [#112](https://github.com/kitconcept/volto-light-theme/pull/112)
- Fix last Teaser bottom border @danalvrz [#117](https://github.com/kitconcept/volto-light-theme/pull/117)
- Fix Separator margins when it has center alignment. @danalvrz [#118](https://github.com/kitconcept/volto-light-theme/pull/118)

### Frontend

#### Documentation

- Add documentation about the rules used in the theme @sneridagh [#109](https://github.com/kitconcept/volto-light-theme/pull/109)
