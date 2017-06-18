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
        <a @click="active_page = 'live-event-log'" class="mdl-navigation__link">
          Live Event Log
        </a>
        <a style="color: white" @click="active_page = 'login'" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Log In
        </a>
      </nav>
    </div>
  </header>
</template>
