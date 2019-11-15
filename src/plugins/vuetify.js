import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.blue.darken1,
        secondary: colors.grey.darken3,
        accent: colors.blue.accent1,
        error: colors.red.accent2,
        info: colors.blue.base,
        success: colors.green.base,
        warning: colors.amber.base,
      },
    },
  },
});
