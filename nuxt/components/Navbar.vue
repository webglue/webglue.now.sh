<template>
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">
        Live Event Log
      </span>
      <!-- Add spacer, to align navigation to the right -->
      <div class="mdl-layout-spacer"></div>
      <nav class="mdl-navigation">
        <a href="" class="mdl-navigation__link">
          Link
        </a>
        <a href="" class="mdl-navigation__link">
          Link
        </a>
        <nuxt-link to="/livelog" class="mdl-navigation__link">
          Live Event Log
        </nuxt-link>
        <nuxt-link style="color: white" to="/login" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Log In
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>
