# kitconcept's volto-light-theme Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html?highlight=towncrier#change-log-entry
-->

<!-- towncrier release notes start -->

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
