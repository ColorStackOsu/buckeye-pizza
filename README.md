# ColorStack at Ohio State

[![Slack](https://img.shields.io/badge/Slack-4A154B?logo=slack&logoColor=fff)](https://join.slack.com/t/colorstackosu/shared_invite/zt-2pm3rbsc0-d25NkeW0B14YIEHclyJsVg)
[![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?logo=linkedin-white&logoColor=fff)](https://www.linkedin.com/company/colorstack-osu/)
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://www.instagram.com/colorstackosu/)

This repository contains the source files for the ColorStack at The Ohio State University website, hosted at [colorstackosu.org](http://colorstackosu.org/).

> [!NOTE]
> The following information is primarily intended for internal use by ColorStack at The Ohio State University. Please be aware that your site may be deployed in a different manner than ours.

## Editing The Site

To make changes to the website, place your files in the `public` folder within this Git repository.

> [!WARNING]
> Do not remove `index.html` or `error.html`, as they are required by the CDN.

## Deployment

Once changes are pushed to the repository:

- The changes automatically propagate to the live website.
- The CDN distribution may take between 1 and 5 minutes to redeploy. Please wait for this duration to see your changes live.

## Notes

- This site is hosted under a free tier with a quota of 5 GB. If additional resources are required, please contact the hosting team.
- While HTTP/HTTPS access is open worldwide, SSH access requires a campus IP or WiscVPN connection.
- The default root object for the root and subfolders is `index.html`.
- The custom error document (e.g., for 404 errors) is named `error.html` and located at the root directory. Please customize this file as needed.
