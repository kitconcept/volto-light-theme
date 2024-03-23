# kitconcept's volto-light-theme Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html?highlight=towncrier#change-log-entry
-->

<!-- towncrier release notes start -->

## 3.1.2 (2024-03-18)

### Internal

- Remove @plone/volto peerDepencency @sneridagh [#364](https://github.com/kitconcept/volto-light-theme/pull/364)
- Add types declarations to make TS happy @sneridagh [#367](https://github.com/kitconcept/volto-light-theme/pull/367)

## 3.1.1 (2024-03-08)

### Bugfix

- Fix typo in container deprecation notice @sneridagh [#362](https://github.com/kitconcept/volto-light-theme/pull/362)

## 3.1.0 (2024-03-08)

### Feature

- [Vertical Spacing] Reduce spacing between title and description in teaser block @iFlameing [#353](https://github.com/kitconcept/volto-light-theme/pull/353)
- Add eu and es translations @erral [#358](https://github.com/kitconcept/volto-light-theme/pull/358)

### Bugfix

- Fix header tabbing order @iRohitSingh [#251](https://github.com/kitconcept/volto-light-theme/pull/251)
- Fix show figcaption tag if ther is no caption @iRohitSingh [#350](https://github.com/kitconcept/volto-light-theme/pull/350)
- Safer pass by value instead of by reference when modifying internal `blockConfig` data @sneridagh [#361](https://github.com/kitconcept/volto-light-theme/pull/361)

### Internal

- @plone/components as dependency
  Use the `Container` component from @plone/components instead of the local one.
  The one in `src/components/Atoms/Container/Container.jsx` is deprecated and will be removed in the next major release. @sneridagh [#360](https://github.com/kitconcept/volto-light-theme/pull/360)

## 3.0.1 (2024-03-04)

### Bugfix

- Fix image gallery opacity. @robgietema [#347](https://github.com/kitconcept/volto-light-theme/pull/347)
- Fix teaser styles on add view. @davisagli [#354](https://github.com/kitconcept/volto-light-theme/pull/354)

### Internal

- Update to Volto 17.15.1 @sneridagh [#348](https://github.com/kitconcept/volto-light-theme/pull/348)

## 3.0.0 (2024-02-14)

### Feature

- Add options to show intranet label and implement intranet header for intranet sites. @iFlameing [#304](https://github.com/kitconcept/volto-light-theme/pull/304)
- Add Event Metadata block @iRohitSingh [#334](https://github.com/kitconcept/volto-light-theme/pull/334)

### Bugfix

- Fix Navigation fails html validator due to use of divs inside ul tag @iRohitSingh [#289](https://github.com/kitconcept/volto-light-theme/pull/289)
- Fixed the Caption for Images, Video Blocks etc. to use semantically correct HTML Structure @Molochem [#341](https://github.com/kitconcept/volto-light-theme/pull/341)
- Fix missing key in `Header` component @sneridagh [#345](https://github.com/kitconcept/volto-light-theme/pull/345)

### Internal

- Support for enhanced initial blocks in config - Update to Volto 17.12.1 @sneridagh [#342](https://github.com/kitconcept/volto-light-theme/pull/342)

## 3.0.0-alpha.3 (2024-02-02)

### Feature

- Allow customizing the secondary navigation entries via Portal action. @iFlameing [#302](https://github.com/kitconcept/volto-light-theme/pull/302)

### Bugfix

- Fix Fat menu A11y issues @iRohitSingh [#264](https://github.com/kitconcept/volto-light-theme/pull/264)
- Fix Introduction-Block inline-styles have wrong typography. @iFlameing [#314](https://github.com/kitconcept/volto-light-theme/pull/314)
- Remove extra site-map from header @iRohitSingh [#339](https://github.com/kitconcept/volto-light-theme/pull/339)

### Internal

- Upgrade to Volto 17.11.2 and Plone 6.0.9 @sneridagh [#328](https://github.com/kitconcept/volto-light-theme/pull/328)
- Upgrade to Votlo 17.11.5 and Plone 6.0.9 @sneridagh [#331](https://github.com/kitconcept/volto-light-theme/pull/331)

## 3.0.0-alpha.2 (2024-01-17)

### Breaking

- Color background go to full-width now instead of snapping to 1440. @sneridagh
  See decision in https://github.com/kitconcept/volto-light-theme/issues/323 [#323](https://github.com/kitconcept/volto-light-theme/pull/323)

### Bugfix

- Fix Responsive breakpoints have gaps for navigation @iRohitSingh [#265](https://github.com/kitconcept/volto-light-theme/pull/265)
- Replaced static values of spacing mixins with variables @ichim-david [#286](https://github.com/kitconcept/volto-light-theme/pull/286)
- Fix paragraph in edit mode is not reflected in view mode of Introduction
  Block @iRohitSingh [#324](https://github.com/kitconcept/volto-light-theme/pull/324)
- Increase BlocksChooser index higher than the sidebar one. @sneridagh [#327](https://github.com/kitconcept/volto-light-theme/pull/327)

### Internal

- Add Search icon is missing on tablet & mobile screen sizes @iRohitSingh [#266](https://github.com/kitconcept/volto-light-theme/pull/266)

## 3.0.0-alpha.1 (2024-01-02)

### Breaking

- Change the Language Selector to only display the first 2 Characters of each Language @Molochem [#321](https://github.com/kitconcept/volto-light-theme/pull/321)

### Feature

- Added a11y tests infrastructure @sneridagh [#300](https://github.com/kitconcept/volto-light-theme/pull/300)

### Bugfix

- Fix wrong styling for all the groups by background in view mode @sneridagh
  Added style support for Image block @sneridagh
  Added style support for Listing block @sneridagh [#322](https://github.com/kitconcept/volto-light-theme/pull/322)

## 3.0.0-alpha.0 (2023-12-27)

### Breaking

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

### Bugfix

- Fix showing up uploaded logo from site controlpanel. @iFlameing [#291](https://github.com/kitconcept/volto-light-theme/pull/291)
- Un-pin `eslint-plugin-jsx-a11y` version @sneridagh [#299](https://github.com/kitconcept/volto-light-theme/pull/299)
- Fix Blocks chooser styling @iRohitSingh [#307](https://github.com/kitconcept/volto-light-theme/pull/307)
- Remove id selector from listings because of css specificity @steffenri [#309](https://github.com/kitconcept/volto-light-theme/pull/309)
- Fix margins of h1 in sitemap view @steffenri [#312](https://github.com/kitconcept/volto-light-theme/pull/312)
- Fix homepage link for all language codes (#298) @steffenri [#313](https://github.com/kitconcept/volto-light-theme/pull/313)

### Internal

- Upgrade slider to 6.1.0 @sneridagh [#316](https://github.com/kitconcept/volto-light-theme/pull/316)

## 2.1.0 (2023-12-13)

### Feature

- Added Image Gallery Listing Metadata @robgietema [#127](https://github.com/kitconcept/volto-light-theme/pull/127)
- Add Brazilian Portuguese translation [@ericof] [#294](https://github.com/kitconcept/volto-light-theme/pull/294)

### Bugfix

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

### Internal

- Run CI workflows for external PRs. @davisagli [#271](https://github.com/kitconcept/volto-light-theme/pull/271)
- Remove old code from navigation component @steffenri [#272](https://github.com/kitconcept/volto-light-theme/pull/272)
- Remove Hero Block @iRohitSingh [#278](https://github.com/kitconcept/volto-light-theme/pull/278)

## 2.0.0 (2023-11-16)

### Breaking

- Added fat menu and mobile menu. @iFlameing
  Since 2.0.0, the light theme has a fat menu (below the main site sections) triggered clickin on one of them.
  It's behind a feature flag, as opt-out:

  ```js
  config.settings.enableFatMenu = true;
  ``` [#86](https://github.com/kitconcept/volto-light-theme/pull/86)

### Feature

- Added Focus and Hover Attributes to UI Buttons @Molochem [#260](https://github.com/kitconcept/volto-light-theme/pull/260)

### Bugfix

- Fix max height for full width map iframe @danalvrz [#257](https://github.com/kitconcept/volto-light-theme/pull/257)
- Fix header alignment of the sections @sneridagh [#261](https://github.com/kitconcept/volto-light-theme/pull/261)

### Internal

- Update to latest Plone and Volto @sneridagh
  Pin `volto-slider-block` to 5.1.1 [#262](https://github.com/kitconcept/volto-light-theme/pull/262)

## 1.0.1 (2023-10-18)

### Bugfix

- Small CSS adjustments @sneridagh [#249](https://github.com/kitconcept/volto-light-theme/pull/249)

### Internal

- Update to Volto 17 final @sneridagh [#246](https://github.com/kitconcept/volto-light-theme/pull/246)
- Bump Volto version @sneridagh [#249](https://github.com/kitconcept/volto-light-theme/pull/249)


## 1.0.0 (2023-09-29)

### Feature

- Update to use the proper linter versions and correct violations @sneridagh [#245](https://github.com/kitconcept/volto-light-theme/pull/245)

### Bugfix

- Upgrade highlight to 3.0.0 and downgrade Plone to 6.0.6 @sneridagh [#244](https://github.com/kitconcept/volto-light-theme/pull/244)


## 1.0.0-rc.20 (2023-09-28)

### Feature

- Add volto-highlight-block @sneridagh [#243](https://github.com/kitconcept/volto-light-theme/pull/243)


## 1.0.0-rc.19 (2023-09-28)

### Bugfix

- Remove too large margins on listing blocks @steffenri [#239](https://github.com/kitconcept/volto-light-theme/pull/239)
- Fix font sizes of one element in grids for edit mode @sneridagh [#241](https://github.com/kitconcept/volto-light-theme/pull/241)
- Update to latest accordion-block, some fixes @sneridagh [#242](https://github.com/kitconcept/volto-light-theme/pull/242)


## 1.0.0-rc.18 (2023-09-25)

### Feature

- Add button and flagAlign in slider block @iRohitSingh [#37](https://github.com/kitconcept/volto-light-theme/pull/37)
- Upgrade to Volto 17a27 @sneridagh [#232](https://github.com/kitconcept/volto-light-theme/pull/232)
- Add kitconcept branding @sneridagh
  Add link to GitHub repo @sneridagh [#233](https://github.com/kitconcept/volto-light-theme/pull/233)

### Bugfix

- Fix aspect ratio in slider @sneridagh [#233](https://github.com/kitconcept/volto-light-theme/pull/233)
- Fix form inputs height, transfer the height property to the parent .ui.input instead of the input itself, which behaves wrong. @sneridagh [#234](https://github.com/kitconcept/volto-light-theme/pull/234)
- Fix anontools in header, convert it to functional @sneridagh [#236](https://github.com/kitconcept/volto-light-theme/pull/236)


## 1.0.0-rc.17 (2023-09-18)

### Feature

- Upgrade to Volto 17a26 - Fix i18n - Upgrade Cypress 13 @sneridagh [#229](https://github.com/kitconcept/volto-light-theme/pull/229)
- Upgrade volto-heading-block version @sneridagh [#230](https://github.com/kitconcept/volto-light-theme/pull/230)

### Bugfix

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

### Bugfix

- Add icons and default image customizations, fix other small image sizing issues for Listings, fix spacing issues for Search block. @danalvrz [#207](https://github.com/kitconcept/volto-light-theme/pull/207)
- Fix font-size of alt text description. @iFlameing [#217](https://github.com/kitconcept/volto-light-theme/pull/217)
- Fix unconditional Register link in header. @fredvd [#219](https://github.com/kitconcept/volto-light-theme/pull/219)


## 1.0.0-rc.15 (2023-08-09)

### Bugfix

- Update the recommended version of volto-separator-block to 4.0.0. @davisagli [#211](https://github.com/kitconcept/volto-light-theme/pull/211)
- ToC block fixes (remove most fields from the block, add default styling
  schema, fix width in edit mode). @davisagli [#212](https://github.com/kitconcept/volto-light-theme/pull/212)
- Hide unnecessary Search block fields. @danalvrz [#213](https://github.com/kitconcept/volto-light-theme/pull/213)
- Upgrade to Volto 17-0.0-alpha.24. @davisagli [#214](https://github.com/kitconcept/volto-light-theme/pull/214)


## 1.0.0-rc.14 (2023-08-08)

### Feature

- Hide change note field. @davisagli [#206](https://github.com/kitconcept/volto-light-theme/pull/206)

### Bugfix

- Remove external link icon from ICS download button event content type @iRohitSingh [#201](https://github.com/kitconcept/volto-light-theme/pull/201)
- Fix teaser right align is not aligned to right side of page @iFlameing. [#202](https://github.com/kitconcept/volto-light-theme/pull/202)
- Add missing german translations @steffenri [#205](https://github.com/kitconcept/volto-light-theme/pull/205)


## 1.0.0-rc.13 (2023-08-03)

### Bugfix

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

### Feature

- Upgrade to Volto 17a22. @davisagli [#186](https://github.com/kitconcept/volto-light-theme/pull/186)

### Bugfix

- Fix responsive font sizing for headings. @danalvrz [#182](https://github.com/kitconcept/volto-light-theme/pull/182)
- Fix map block. @iFlameing [#183](https://github.com/kitconcept/volto-light-theme/pull/183)


## 1.0.0-rc.11 (2023-07-28)

### Breaking

- Update to Volto 17a21
  Deprecate volto-image-block
  Use new core Image component
  @sneridagh [#177](https://github.com/kitconcept/volto-light-theme/pull/177)


## 1.0.0-rc.10 (2023-07-26)

### Bugfix

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

### Breaking

- Refactor existing customizations, removing the ones no longer needed (because they are present in Volto already) and using the new pattern in the others. Volto 17a20 is required in order to retain consistency. @sneridagh [#166](https://github.com/kitconcept/volto-light-theme/pull/166)

### Bugfix

- Fix NewsItemView as wella sd Link View @iFlameing [#127](https://github.com/kitconcept/volto-light-theme/pull/127)
- Fix Image View in edit mode @iFlameing. [#154](https://github.com/kitconcept/volto-light-theme/pull/154)
- Update volto-image-block @sneridagh [#159](https://github.com/kitconcept/volto-light-theme/pull/159)
- Fix File View implementation @iFlameing [#162](https://github.com/kitconcept/volto-light-theme/pull/162)

### Internal

- Upgrade volto-image-block to fix the image upload @sneridagh [#149](https://github.com/kitconcept/volto-light-theme/pull/149)
- Upgrade to Volto 17a20 @sneridagh [#163](https://github.com/kitconcept/volto-light-theme/pull/163)
- Remove the `apiExpanders` existing locally in the package since it's already in Volto 17a20 @sneridagh [#164](https://github.com/kitconcept/volto-light-theme/pull/164)


## 1.0.0-rc.8 (2023-07-14)

### Bugfix

- Fix Image content type @iRohitSingh [#18](https://github.com/kitconcept/volto-light-theme/pull/18)
- Fix a11y issues in EventView @steffenri [#147](https://github.com/kitconcept/volto-light-theme/pull/147)
- Remove typo in fileview @steffenri [#148](https://github.com/kitconcept/volto-light-theme/pull/148)

### Documentation

- Documentation on local docker development - local ESlint working @sneridagh [#144](https://github.com/kitconcept/volto-light-theme/pull/144)


## 1.0.0-rc.7 (2023-07-13)

### Bugfix

- Fix File content type @iRohitSingh [#17](https://github.com/kitconcept/volto-light-theme/pull/17)
- Add idiomatic order CSS package @sneridagh
  Fix margin in edit mode for all blocks @sneridagh [#142](https://github.com/kitconcept/volto-light-theme/pull/142)
- Fix CSS for Accordion block. @danalvrz [#143](https://github.com/kitconcept/volto-light-theme/pull/143)


## 1.0.0-rc.6 (2023-07-12)

### Bugfix

- Fix Event content type @iRohitSingh [#16](https://github.com/kitconcept/volto-light-theme/pull/16)
- Fix local linting, add proper eslintignore @sneridagh [#139](https://github.com/kitconcept/volto-light-theme/pull/139)
- Minor fix for Listing margins. @danalvrz [#140](https://github.com/kitconcept/volto-light-theme/pull/140)
- Fix gutter for grids for small screens. Improve overall margins calculations for all blocks in the content area. @sneridagh [#141](https://github.com/kitconcept/volto-light-theme/pull/141)


## 1.0.0-rc.5 (2023-07-11)

### Breaking

- Move the container query polyfill to an add-on profile, disabled by default @sneridagh [#137](https://github.com/kitconcept/volto-light-theme/pull/137)

### Feature

- Upgrade to Volto 17a17 as baseline @sneridagh [#136](https://github.com/kitconcept/volto-light-theme/pull/136)
- Add acceptance tests layer, update docker files and Makefile @sneridagh [#137](https://github.com/kitconcept/volto-light-theme/pull/137)

### Bugfix

- Check if the separator is present before enhancing it @sneridagh [#138](https://github.com/kitconcept/volto-light-theme/pull/138)


## 1.0.0-rc.4 (2023-07-11)

### Bugfix

- Fix Teaser block CSS. @danalvrz [#134](https://github.com/kitconcept/volto-light-theme/pull/134)


## 1.0.0-rc.3 (2023-07-10)

### Breaking

- Remove `@kitconcept/volto-blocks-grid` dependency @sneridagh [#131](https://github.com/kitconcept/volto-light-theme/pull/131)

### Bugfix

- Fix minor style bugs for Listing block @danalvrz [#130](https://github.com/kitconcept/volto-light-theme/pull/130)

### Internal

- Create deploy to https://light-theme.kitconcept.io [@ericof] [#72](https://github.com/kitconcept/volto-light-theme/pull/72)


## 1.0.0-rc.2 (2023-07-07)

### Bugfix

- Add NewsItemView @iFlamieng [#127](https://github.com/kitconcept/volto-light-theme/pull/127)
- Add support for margins in responsive. Improve the spacing in grids. @sneridagh [#129](https://github.com/kitconcept/volto-light-theme/pull/129)


## 1.0.0-rc.1 (2023-07-05)

### Bugfix

- Fix css issue of image block full width variante @iFlameing [#115](https://github.com/kitconcept/volto-light-theme/pull/115)
- Fix minor style bugs in several components. @danalvrz [#122](https://github.com/kitconcept/volto-light-theme/pull/122)


## 1.0.0-rc.0 (2023-06-29)

### Feature

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

### Bugfix

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

### Documentation

- Add documentation about the rules used in the theme @sneridagh [#109](https://github.com/kitconcept/volto-light-theme/pull/109)
