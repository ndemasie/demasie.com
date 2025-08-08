# [demasie.com](https://demasie.com)

<a href="https://www.demasie.com"><img src="https://img.shields.io/website.svg?label=demasie.com&url=http%3A%2F%2Fwww.demasie.com/health"/></a><br/>
<a href="https://nathan.demasie.com"><img src="https://img.shields.io/website.svg?label=nathan.demasie.com&url=http%3A%2F%2Fnathan.demasie.com/health"/></a><br/>
<a href="https://habit.demasie.com"><img src="https://img.shields.io/website.svg?label=habit.demasie.com&url=http%3A%2F%2Fhabit.demasie.com/health"/></a><br/>
<a href="https://refer.demasie.com"><img src="https://img.shields.io/website.svg?label=refer.demasie.com&url=http%3A%2F%2Frefer.demasie.com/health"/></a><br/>
<a href="https://ssh.demasie.com"><img src="https://img.shields.io/website.svg?label=ssh.demasie.com&url=http%3A%2F%2Fssh.demasie.com/health"/></a><br/>

<img src="https://img.shields.io/website.svg?label=nathan-app-site&url=http%3A%2F%2Fnathan-app-site.demasie.com/health"/><br/>
<img src="https://img.shields.io/website.svg?label=nathan-edu-i18next-server&url=http%3A%2F%2Fnathan-edu-i18next-server.demasie.com/health"/><br/>
<img src="https://img.shields.io/website.svg?label=nathan-app-habit-print&url=http%3A%2F%2Fnathan-app-habit-print.demasie.com/health"/><br/>
<img src="https://img.shields.io/website.svg?label=nathan-app-refer-codes&url=http%3A%2F%2Fnathan-app-refer-codes.demasie.com/health"/><br/>

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
    domain_cutie("cutie.demasie.com")
    domain_ssh("ssh.demasie.com")
  end

  subgraph Infra
    infra_cloudflare(infra-cloudflare)
  end

  subgraph Internals
    internal_ssh(internal-ssh)
  end

  subgraph Tools
    demasie_tool_proxy(demasie-tool-proxy)
    tool_watchtower(tool-watchtower)
  end

  subgraph DeMasie
    demasie_app_proxy(demasie-app-proxy)

    subgraph Natalie
      natalie_app_site(natalie-app-site)
    end

    subgraph Nathan
      nathan_edu_i18next(nathan-edu-i18next-server)
      nathan_app_habit_print(nathan-app-habit-print)
      nathan_app_refer_codes(nathan-app-refer-codes)

      subgraph Site
        nathan_app_site(nathan-app-site)
        nathan_edu_i18next(nathan-edu-i18next)
        nathan_edu_design_principles(nathan-edu-design-principles)
        nathan_edu_i18next_server(nathan_edu_i18next_server)
      end
    end

    subgraph External
      codedamn_design_principles(codedamn-design-principles)
      iluvyou_app(iluvyou.app)
    end
  end

  %% Flow
  domain --- infra_cloudflare
  domain_nathan --- infra_cloudflare
  domain_habit --- infra_cloudflare
  domain_refer --- infra_cloudflare
  domain_cutie --- infra_cloudflare
  domain_ssh --- infra_cloudflare

  infra_cloudflare ---|<div>demasie-app-proxy:10100</br>demasie-app-proxy:10150</br>demasie-app-proxy:10200</br>demasie-app-proxy:10300</br>demasie-app-proxy:10400</br></div>| demasie_app_proxy
  infra_cloudflare ---|<div>demasie-tool-proxy:9000</div>| demasie_tool_proxy
  infra_cloudflare ---|<div>host.docker.internal</div>| internal_ssh

  demasie_app_proxy ---|<div>nathan-app-site:10100</div>| nathan_app_site
  demasie_app_proxy ---|<div>natalie-app-site:10150</div>| natalie_app_site
  demasie_app_proxy ---|<div>nathan-edu-i18next-server:10200</div>| nathan_edu_i18next_server
  demasie_app_proxy ---|<div>nathan-app-habit-print:10300</div>| nathan_app_habit_print
  demasie_app_proxy ---|<div>nathan-app-refer-codes:10400</div>| nathan_app_refer_codes

  demasie_tool_proxy ---|<div>tool-watchtower:8080</div>| tool_watchtower

  natalie_app_site --> iluvyou_app

  nathan_app_site --> nathan_edu_i18next
  nathan_app_site --> nathan_edu_design_principles
  nathan_edu_design_principles -.-> |/nathan-edu-design-principles/proxy| codedamn_design_principles
  nathan_edu_i18next <-.->|ws| nathan_edu_i18next_server

  click domain "https://www.demasie.com" _blank
  click domain_cutie "https://cutie.demasie.com" _blank
  click domain_habit "https://habit.demasie.com" _blank
  click domain_nathan "https://nathan.demasie.com" _blank
  click domain_refer "https://refer.demasie.com" _blank

  click demasie_app_proxy "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/demasie-app-proxy" _blank
  click nathan_app_habit_print "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-app-habit-print" _blank
  click nathan_app_refer_codes "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-app-refer-codes" _blank
  click nathan_app_site "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-app-site" _blank
  click nathan_edu_design_principles "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-edu-design-principles" _blank
  click nathan_edu_i18next "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-edu-i18next" _blank
  click nathan_edu_i18next_server "https://github.com/ndemasie/ndemasie.github.io/tree/main/packages/nathan-edu-i18next-server" _blank

  click codedamn_design_principles "https://codedamn.com/playground/qjHW2vXxppVc48uXH5UWv" _blank
  click iluvyou_app "https://iluvyou.app/valentine?d=eyJuYW1lIjoiQ3V0aWUiLCJkYXlzIjoyNzQ1fQ%3D%3D" _blank
```
