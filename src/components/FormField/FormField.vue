<template>
  <div :class="`
    FormField
    ${centered ? 'FormField_Centered' : ''}
    ${main ? 'FormField_Main' : ''}
    ${slim ? 'FormField_Slim' : ''}
    ${validate ? 'FormField_WithValidation' : ''}
    ${validationStatus === 'valid' ? 'FormField_Valid_Yes' : ''}
    ${validationStatus === 'inprogress' ? 'FormField_Valid_InProgress' : ''}
  `.trim()">
    <span
      class="FormField-BeforeText"
      v-if="before"
    >
      {{ before }}
    </span>
    <div class="FormField-InputWrapper">
      <input
        :class="`
          FormField-Input
          Typo
          Typo_Size_${slim ? 'xxxl' : 'l'}
        `.trim()"
        :disabled="Boolean(disabled)"
        :placeholder="placeholder"
        :type="type || 'text'"
        :value="link"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        v-model="inputValue"
      />
    </div>
    <interface-link
      class="FormField-AfterLink"
      theme="blue"
      :url="Boolean(after) && after.url"
      v-show="Boolean(after) && !Boolean(inputValue)"
    >
      {{ Boolean(after) && after.text }}
    </interface-link>
    <div
      v-if="validate && Boolean(validText)"
      v-show="validationStatus === 'valid'"
      class="FormField-ValidationSuccessMessage"
    >
    {{ validText }}
    </div>
  </div>
</template>

<script>
import InterfaceLink from '../InterfaceLink/InterfaceLink.vue';

import './FormField.styl';
import '../Typo/Typo.styl';

export default {
  name: 'FormField',
  props: {
    afterLink: Object,
    beforeText: String,
    disabled: Boolean,
    centered: Boolean,
    main: Boolean,
    placeholder: String,
    slim: Boolean,
    type: String,
    value: String,
    valid: Boolean,
    validate: Boolean,
    validText: String
  },
  components: {
    InterfaceLink
  },
  data() {
    return {
      after: this.afterLink,
      before: this.beforeText,
      inputValue: this.value,
      validationStatus: this.valid ? 'valid' : undefined
    }
  },
  methods: {
    onFocus() {
      this.active = true;
      this.$el.classList.add('FormField_Active');
    },
    onBlur() {
      this.active = false;
      this.$el.classList.remove('FormField_Active');

      if (this.validate) {
        this.validationStatus = 'inprogress'; // TODO сделать валидацию

        setTimeout(() => {
          this.validationStatus = 'valid';
        }, 2000);
      }
    },
    onInput() {
      this.$emit('input', this.inputValue);
    }
  }
}
</script>
