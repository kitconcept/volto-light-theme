#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, ".");

const readJSON = (relativePath) => {
  const filePath = path.join(rootDir, relativePath);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    console.error(`Failed to read ${relativePath}: ${error.message}`);
    process.exit(1);
  }
};

// Packages that should be ignored when comparing versions
const excludedPackages = new Set(["@eeacms/volto-accordion-block"]);

const recommendedAddons = readJSON("recommendedAddons.json");
const mrsDeveloper = readJSON("frontend/mrs.developer.json");

const normalizeVersion = (version) =>
  typeof version === "string" ? version.replace(/^[\\^~]/, "") : version;

const mrsByPackage = Object.entries(mrsDeveloper).reduce(
  (acc, [configKey, configValue]) => {
    if (configValue && typeof configValue === "object" && configValue.package) {
      acc[configValue.package] = { ...configValue, configKey };
    }
    return acc;
  },
  {}
);

const issues = [];

Object.entries(recommendedAddons).forEach(
  ([packageName, recommendedVersion]) => {
    if (excludedPackages.has(packageName)) {
      return;
    }

    const mrsEntry = mrsByPackage[packageName];

    if (!mrsEntry) {
      issues.push(
        `${packageName} is listed in recommendedAddons.json but missing from frontend/mrs.developer.json.`
      );
      return;
    }

    const mrsVersion = mrsEntry.tag || mrsEntry.branch || mrsEntry.version;

    if (!mrsVersion) {
      issues.push(
        `${packageName} (${mrsEntry.configKey}) has no tag, branch, or version specified in frontend/mrs.developer.json.`
      );
      return;
    }

    const normalizedRecommended = normalizeVersion(recommendedVersion);
    const normalizedMrsVersion = normalizeVersion(mrsVersion);

    if (
      recommendedVersion !== mrsVersion &&
      normalizedRecommended !== normalizedMrsVersion
    ) {
      issues.push(
        `${packageName} differs: recommendedAddons.json=${recommendedVersion} vs frontend/mrs.developer.json(${mrsEntry.configKey})=${mrsVersion}.`
      );
    }
  }
);

if (issues.length) {
  console.error("Add-on version mismatches detected:");
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log(
  "Add-on versions match between recommendedAddons.json and frontend/mrs.developer.json."
);
