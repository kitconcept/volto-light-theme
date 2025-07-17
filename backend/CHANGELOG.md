# Changelog

<!-- towncrier release notes start -->

## 7.0.0a15 (2025-07-17)


### Breaking changes:

- We renamed this three fields in the `kitconcept.footer` behavior. @sneridagh
  `footer_main_logo_inversed` => `footer_logo`
  `footer_logo` => `post_footer_logo`
  `footer_logo_link` => `post_footer_logo_link` 


### New features:

- Add Spanish translation [@macagua] [#597](https://github.com/kitconcept/volto-light-theme/issues/597)

## 7.0.0a14 (2025-07-10)


### New features:

- Added `footer_main_logo_inversed` image field to kitconcept.footer behavior. This adds support for setting an inversed color main logo that will appear at the top of the footer address. @sneridagh [#600](https://github.com/kitconcept/volto-light-theme/issues/600)


### Internal:

- Add example content for Event Calendar block @iFlameing [#591](https://github.com/kitconcept/volto-light-theme/issues/591)

## 7.0.0a12 (2025-06-18)


### New features:

- Reintroduce an improved `Anontools` using `portal_actions`. @sneridagh [#581](https://github.com/kitconcept/volto-light-theme/issues/581)

## 7.0.0a11 (2025-06-12)


### Internal:

- Add example content of missing blocks @iRohitSingh 

## 7.0.0a10 (2025-06-10)

No significant changes.


## 7.0.0a9 (2025-06-09)

No significant changes.


## 7.0.0a8 (2025-06-06)

No significant changes.


## 7.0.0a7 (2025-06-04)


### New features:

- Update pt_BR translation. @ericof 

## 7.0.0a6 (2025-06-04)


### Internal:

- Update social media to latest to fix Redux complaining. @sneridagh 

## 7.0.0a5 (2025-06-04)

No significant changes.


## 7.0.0a4 (2025-05-22)


### New features:

- Added customizable colophon footer behavior field `footer_colophon_text`. @sneridagh 

## 6.0.1 (2025-05-15)

No significant changes.


## 6.0.0 (2025-05-14)

No significant changes.


## 6.0.0a25 (2025-05-14)

No significant changes.


## 6.0.0a24 (2025-05-06)


### New features:

- Added behavior `voltolighttheme.sticky_menu`. @sneridagh [#523](https://github.com/kitconcept/volto-light-theme/issues/523)
- Better naming for the specific kitconcept's behaviors for distributions. @sneridagh [#530](https://github.com/kitconcept/volto-light-theme/issues/530)

## 6.0.0a23 (2025-04-30)

No significant changes.


## 6.0.0a22 (2025-04-29)


### New features:

- Added `distributions.py` module. Added new behavior: `kitconcept.distributions.footer`.
  These behaviors power the "distribution" side of VLT customizations.
  @sneridagh [#525](https://github.com/kitconcept/volto-light-theme/issues/525)


### Bug fixes:

- Adjust help for fields `intranet_flag` `complementary_logo`. @sneridagh [#524](https://github.com/kitconcept/volto-light-theme/issues/524)


### Internal:

- Improve setup profiles for demo and acceptance. @sneridagh [#522](https://github.com/kitconcept/volto-light-theme/issues/522)
- Remove support for Python 3.10 and 3.11. @sneridagh [#525](https://github.com/kitconcept/volto-light-theme/issues/525)

## 6.0.0a21 (2025-04-02)


### Internal:

- Test with Plone 6.1.1. @davisagli 

## 6.0.0a20 (2025-04-01)


### New features:

- Added new fields `has_intranet_header` and `has_fat_menu` to site customization behaviors. @sneridagh [#516](https://github.com/kitconcept/volto-light-theme/issues/516)


### Internal:

- Ensures filename of source distribution follows PEP 625. @ericof 

## 6.0.0a19 (2025-03-25)

No significant changes.


## 6.0.0a18 (2025-03-21)


### New features:

- Added upgrade step for update old data structure in `footer_links` and `footer_logos`. @sneridagh [#508](https://github.com/kitconcept/volto-light-theme/issues/508)
- Install behavior to Plone site in demo profile. @sneridagh 

## 6.0.0a17 (2025-03-20)


### New features:

- Added the Site Customization behaviors. @sneridagh [#497](https://github.com/kitconcept/volto-light-theme/issues/497)
- Initial release @ericof 


### Internal:

- Update README file for the package @ericof
