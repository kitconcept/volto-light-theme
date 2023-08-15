# kitconcept's volto-light-theme Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html?highlight=towncrier#change-log-entry
-->

<!-- towncrier release notes start -->

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
