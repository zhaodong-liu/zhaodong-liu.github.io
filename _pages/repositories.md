---
layout: page
permalink: /repositories/
title: '<span class="lang-en">repositories</span><span class="lang-zh">代码仓库</span>'
description: '<span class="lang-en">My open-source projects and research implementations.</span><span class="lang-zh">我的开源项目与科研代码实现。</span>'
nav: true
nav_order: 4
---

{% if site.data.repositories.github_users %}

<h2><span class="lang-en">GitHub users</span><span class="lang-zh">GitHub 用户</span></h2>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.liquid username=user %}
  {% endfor %}
</div>

---

{% if site.repo_trophies.enabled %}
{% for user in site.data.repositories.github_users %}
{% if site.data.repositories.github_users.size > 1 %}

  <h4>{{ user }}</h4>
  {% endif %}
  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_trophies.liquid username=user %}
  </div>

---

{% endfor %}
{% endif %}
{% endif %}

{% if site.data.repositories.github_repos %}

<h2><span class="lang-en">GitHub Repositories</span><span class="lang-zh">GitHub 仓库</span></h2>

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
