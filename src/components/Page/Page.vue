/* eslint-disable vue/no-unused-components */
<template>
	<div>
		<v-runtime-template :template="template"></v-runtime-template>
	</div>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template';

import '../Theme/Theme.styl';

export default {
  name: 'Page',
  data() {
    return {
      template: this.compileTemplate(this.$store.state.json)
    };
  },
  components: {
    VRuntimeTemplate,
  },
  methods: {
    compileTemplate(block) {
      if (!block) return '';
      if ((typeof block === 'string') || (typeof block === 'number') || block === true) {
        return block.toString();
      }

      if (Array.isArray(block)) {
        return block.reduce((html, el) => {
          html += this.compileTemplate(el);

          return html;
        }, '');
      }

      let tmpl = '<' + block.block;

      if (block.props) {
        Object.keys(block.props).forEach(key => {
          tmpl += ' ';

          const value = block.props[key];

          switch(typeof value) {
            case 'boolean':
            case 'number':
            case 'undefined':
              tmpl += `:${key}=${value}`;
              break;
            case 'string':
              tmpl += `${key}="${value}"`;
              break;
            case 'array':
            case 'object':
              tmpl += `:${key}="${JSON.stringify(value).replace(/"/g, "'")}"`;
              break;
          }
        });
      }

      tmpl += '>';

      if (block.content) tmpl += this.compileTemplate(block.content);

      tmpl += `</${block.block}>`;

      console.log(JSON.stringify(this.$store.state.json));

      console.log(tmpl);
      return tmpl;
    }
  }
}
</script>
