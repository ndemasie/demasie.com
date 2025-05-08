# [demasie.com](https://demasie.com)

<a href="https://www.demasie.com"><img src="https://img.shields.io/website.svg?label=demasie.com&url=http%3A%2F%2Fwww.demasie.com/health"/></a><br/>
<a href="https://nathan.demasie.com"><img src="https://img.shields.io/website.svg?label=nathan.demasie.com&url=http%3A%2F%2Fnathan.demasie.com/health"/></a><br/>
<a href="https://habit.demasie.com"><img src="https://img.shields.io/website.svg?label=habit.demasie.com&url=http%3A%2F%2Fhabit.demasie.com/health"/></a><br/>
<a href="https://refer.demasie.com"><img src="https://img.shields.io/website.svg?label=refer.demasie.com&url=http%3A%2F%2Frefer.demasie.com/health"/></a><br/>

<img src="https://img.shields.io/website.svg?label=nathan-app-site&url=http%3A%2F%2Fnathan-app-site.demasie.com/health"/><br/>
<img src="https://img.shields.io/website.svg?label=nathan-edu-i18next-server&url=http%3A%2F%2Fnathan-edu-i18next-server.demasie.com/health"/><br/>
<img src="https://img.shields.io/website.svg?label=nathan-app-habit-print&url=http%3A%2F%2Fnathan-app-habit-print.demasie.com/health"/><br/>
<img src="https://img.shields.io/website.svg?label=nathan-app-referral-codes&url=http%3A%2F%2Fnathan-app-referral-codes.demasie.com/health"/><br/>

<!-- ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ndemasie/ndemasie.github.io/deploy-ec2.yml) -->

|          |                                                                             |
| -------- | --------------------------------------------------------------------------- |
| DevOps   | ![Infra](https://skillicons.dev/icons?i=cloudflare,raspberrypi,docker)<br/> |
| Backend  | ![Backend](https://skillicons.dev/icons?i=nginx,nodejs)<br/>                |
| Frontend | ![Frontend](https://skillicons.dev/icons?i=astro,react,vue,svelte,lit)<br/> |

```mermaid
%%{init: { 'theme': 'dark', 'flowchart' : {'curve' : 'linear'}}}%%

flowchart TB
  subgraph Internet
    domain("demasie.com")
    domain_nathan("nathan.demasie.com")
    domain_habit("habit.demasie.com")
    domain_refer("refer.demasie.com")
  end

  subgraph External
    codedamn_design_principles(codedamn-design-principles)
  end

  subgraph Docker Compose
    cloudflared(cloudflared)
    nginx(nginx)
    nathan_edu_i18next(nathan-edu-i18next-server)
    nathan_app_habit_print(nathan-app-habit-print)
    nathan_app_referral_codes(nathan-app-referral-codes)

    subgraph Site
      nathan_app_site(nathan-app-site)
      nathan_edu_i18next(nathan-edu-i18next)
      nathan_edu_design_principles(nathan-edu-design-principles)
    end
  end

  %% Flow
  domain --- cloudflared
  domain_nathan --- cloudflared
  domain_habit --- cloudflared
  domain_refer --- cloudflared

  cloudflared --- nginx

  nginx ---|<div>nathan-app-site:10100</div>| nathan_app_site
  nginx ---|<div>nathan-edu-i18next-server:10200</div>| nathan_edu_i18next_server
  nginx ---|<div>nathan-app-habit-print:10300</div>| nathan_app_habit_print
  nginx ---|<div>nathna-app-referral-codes:10400</div>| nathan_app_referral_codes

  nathan_app_site --> nathan_edu_i18next
  nathan_app_site --> nathan_edu_design_principles
  nathan_edu_i18next <-.->|ws| nathan_edu_i18next_server
  nathan_edu_design_principles -.-> |/nathan-edu-design-principles/proxy| codedamn_design_principles

  click domain "https://www.demasie.com" _blank
  click domain_nathan "https://nathan.demasie.com" _blank
  click domain_habit "https://habit.demasie.com" _blank
  click domain_refer "https://refer.demasie.com" _blank

  click nginx "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nginx" _blank

  click nathan_app_habit_print "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-app-habit-print" _blank
  click nathan_app_referral_codes "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-app-referral-codes" _blank
  click nathan_app_site "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-app-site" _blank
  click nathan_edu_design_principles "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-edu-design-principles" _blank
  click nathan_edu_i18next "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-edu-i18next" _blank
  click nathan_edu_i18next_server "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-edu-i18next-server" _blank

  click codedamn_design_principles "https://codedamn.com/playground/qjHW2vXxppVc48uXH5UWv" _blank
```
