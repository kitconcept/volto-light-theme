"""Installer for the kitconcept.voltolighttheme package."""
from pathlib import Path
from setuptools import find_namespace_packages
from setuptools import setup


long_description = f"""
{Path("README.md").read_text()}\n
{Path("CONTRIBUTORS.md").read_text()}\n
{Path("CHANGES.md").read_text()}\n
"""


setup(
    name="kitconcept.voltolighttheme",
    version="1.0.0a1",
    description="Example content for @kitconcept/volto-light-theme.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Environment :: Web Environment",
        "Framework :: Plone",
        "Framework :: Plone :: Addon",
        "Framework :: Plone :: Distribution",
        "Framework :: Plone :: 6.0",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.11",
        "Operating System :: OS Independent",
        "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
    ],
    keywords="Python Plone CMS",
    author="kitconcept GmbH",
    author_email="contact@kitconcept.com",
    url="https://github.com/kitconcept/kitconcept.voltolighttheme",
    project_urls={
        "PyPI": "https://pypi.python.org/pypi/kitconcept.voltolighttheme",
        "Source": "https://github.com/kitconcept/kitconcept.voltolighttheme",
        "Tracker": "https://github.com/kitconcept/kitconcept.voltolighttheme/issues",
    },
    license="GPL version 2",
    package_dir={"": "src"},
    packages=find_namespace_packages("src", include=["kitconcept.*"]),
    include_package_data=True,
    zip_safe=False,
    python_requires=">=3.11",
    install_requires=[
        "setuptools",
        "Plone",
        "plone.distribution",
        "plone.api",
    ],
    extras_require={
        "test": [
            "zest.releaser[recommended]",
            "zestreleaser.towncrier",
            "plone.app.testing",
            "plone.restapi[test]",
            "pytest",
            "pytest-cov",
            "pytest-plone>=0.2.0",
        ],
    },
    entry_points="""
    [z3c.autoinclude.plugin]
    target = plone
    [console_scripts]
    update_dist_locale = kitconcept.voltolighttheme.locales.update:update_locale
    """,
)
