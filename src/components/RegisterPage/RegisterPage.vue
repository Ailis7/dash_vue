<template>
  <main class="RegisterPage">
    <header class="RegisterPage-Header">
      <div class="RegisterPage-Back" @click="onBackClick">
        <img class="RegisterPage-BackIcon" src="../../assets/back-black.svg"/>
      </div>
      <div class="RegisterPage-Progress Typo Typo_Size_xxxl">
        <div class="RegisterPage-ProgressTop">
          <div class="RegisterPage-ProgressTitle">{{ {
              1: 'Твоя Ссылка',
              2: 'Аватар',
              3: 'Давайте знакомиться!',
              4: 'Расскажите о себе',
              5: 'Дизайн',
              6: 'Поздравляем!'
            }[this.currentStep]}}</div>
          <div class="RegisterPage-ProgressNumber">{{ this.displayStep }}/5</div>
        </div>
        <div class="RegisterPage-ProgressBar">
          <k-progress
            bg-color="rgba(127, 132, 137, 0.25)"
            color="linear-gradient(180deg, #06DF57 0%, #18AD00 100%);"
            :line-height=3
            :percent="this.displayStep / 5 * 100"
            :show-text=false
          ></k-progress>
        </div>
      </div>
    </header>
    <paragraph
      :class="`
        RegisterPage-Title
        ${this.currentStep > 1 ? 'RegisterPage-Title_Top' : ''}
      `.trim()"
      :centered=true
      :size="currentStep === 2 ? 'l' : 'xxxl'"
    >
    {{
      {
        1: 'Придумай ссылку для своей визитки.',
        2: this.avatarText,
        5: 'Выберите стиль главного блока'
      }[this.currentStep]
    }}
    </paragraph>
    <form-field
      class="RegisterPage-LinkInput"
      v-show="currentStep === 1"
      beforeText="vizi.one/"
      :main=true
      theme="blue"
      :slim=true
      :validate=true
      validText="Ссылка свободна"
      v-on:input="onLinkInput"
    />
    <div
      :class="`
          RegisterPage-UploadAvatar
          ${avatarUploaded ? 'RegisterPage-UploadAvatar_Status_Success' : ''}
        `.trim()"
      v-show="currentStep === 2"
    >
      <div class="RegisterPage-UploadAvatarCamera Typo Typo_Size_xxs" @click="onUploadClick"></div>
      <div class="RegisterPage-UploadAvatarIndicator">
        <vue2-dropzone
          class="RegisterPage-UploadDropzone"
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          v-on:vdropzone-complete="onUploadComplete"
        />
      </div>
      <div class="RegisterPage-UploadAvatarDelete Typo Typo_Size_xxs" @click="onDeleteClick"></div>
    </div>
    <div
      class="RegisterPage-Panel"
      v-show="[3, 4].includes(currentStep)"
    >
      <header class="RegisterPage-PanelHeader">
        <avatar
          avatar="https://i.imgur.com/IwhKo8S.jpg"
          theme="blue"
          rounded="circle"
          size="s"
        />
        <div class="RegisterPage-Name">
          <text-input
            v-show="currentStep === 3"
            mode="oneline"
            placeholder="Ваше имя и фамилию"
            v-on:input="onNameInput"
          />
          <paragraph
            v-show="currentStep === 4"
            size="xxl"
          >
            {{ userName }}
          </paragraph>
        </div>
      </header>
      <footer v-show="currentStep === 3" class="RegisterPage-PanelFooter">
        <div class="RegisterPage-PanelTextPlaceholder">
          <placeholder/>
        </div>
        <div class="RegisterPage-PanelButtonPlaceholder">
          <placeholder/>
        </div>
        <div class="RegisterPage-PanelButtonPlaceholder">
          <placeholder/>
        </div>
      </footer>
      <text-input
        v-show="currentStep === 4"
        mode="multiline"
        placeholder="Расскажите коротко о себе"
        v-on:input="onAboutInput"
      />
    </div>
    <div
      v-show="currentStep === 5"
      class="RegisterPage-CardCarousel"
    >
      <carousel
        :loop="true"
        :mouse-drag="true"
        :navigationEnabled="true"
        :navigationNextLabel="'<img src=' + require(`@/assets/forward-small.svg`) + ' />'"
        :navigationPrevLabel="'<img src=' + require(`@/assets/back-small.svg`) + ' />'"
        :paginationPadding="7.5"
        :paginationSize="18"
        :per-page="1"
      >
        <slide>
          <card-header
            avatar="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyODBwdCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDEyNzkgMTI4MCIgd2lkdGg9IjEyNzlwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNjczYWI3IiB0cmFuc2Zvcm09Im1hdHJpeCguMSAwIDAgLS4xIDAgMTI4MCkiPjxwYXRoIGQ9Im0xNzgwIDEyNzkzYy00NjQtNDctODU2LTIyNi0xMTc5LTUzOC0xNzQtMTY4LTI4NC0zMTYtMzkwLTUyNS0zNzgtNzQ0LTIzNi0xNjQ5IDM1Mi0yMjQ0IDQzNS00MzkgMTA1NC02NDYgMTY2My01NTcgMjIwIDMzIDM2OCA3OCA1NzAgMTc2IDU4OSAyODUgOTg4IDgzNiAxMDgwIDE0OTEgMjIgMTYwIDE1IDQ1Mi0xNSA2MDktMTYyIDg1Ny04NTYgMTQ5Ni0xNzIxIDE1ODQtOTYgMTAtMjgxIDEyLTM2MCA0eiIvPjxwYXRoIGQ9Im02MTY1IDEyNzg1Yy00NDUtNTQtODM1LTI0NS0xMTUwLTU2Mi03NTYtNzU5LTc1My0xOTg1IDUtMjc0MyAzNjktMzY5IDg1My01NzAgMTM3NS01NzAgOTEzIDAgMTcwMSA2MzIgMTg5OSAxNTIxIDE0NCA2NDktNTEgMTMyMi01MTkgMTc5Mi00MjYgNDI4LTEwMTkgNjM1LTE2MTAgNTYyeiIvPjxwYXRoIGQ9Im0xMDYzNiAxMjc5MGMtODYxLTk5LTE1NDYtNzM0LTE3MDctMTU4NS0zMC0xNTctMzctNDQ5LTE1LTYwOSA5Mi02NTUgNDkxLTEyMDYgMTA4MC0xNDkxIDIwMi05OCAzNTAtMTQzIDU3MC0xNzYgNjA5LTg5IDEyMjggMTE4IDE2NjMgNTU3IDU4OCA1OTUgNzMwIDE1MDAgMzUyIDIyNDQtMTA2IDIwOS0yMTYgMzU3LTM5MCA1MjUtMjkwIDI4MC02MzYgNDUzLTEwMzkgNTIwLTExMyAxOS00MDMgMjctNTE0IDE1eiIvPjxwYXRoIGQ9Im0xNzkyIDgzMzljLTMxMC0yNC02MzgtMTM1LTkwMi0zMDYtNzQ1LTQ4My0xMDY4LTE0MDMtNzkwLTIyNDUgMzI1LTk4MiAxMzYyLTE1MzYgMjM2Ni0xMjYzIDQ3MyAxMjkgODkzIDQ0OSAxMTUzIDg3OSAzNjIgNjAyIDM2MiAxMzkwIDAgMTk5Mi0xOTQgMzIxLTQ4OCA1OTEtODE0IDc0OS0xNzYgODYtMzI1IDEzNS01MTAgMTcwLTc3IDE0LTMyNCAzNi0zNzUgMzQtMTQtMS03MS01LTEyOC0xMHoiLz48cGF0aCBkPSJtNjI0NSA4MzQwYy0xMDE4LTg0LTE3OTUtOTI0LTE3OTUtMTk0MCAwLTg0NiA1NTEtMTYwMCAxMzU1LTE4NTQgMjA1LTY1IDM2My04OCA1OTAtODggNTE3IDAgOTc1IDE4NCAxMzQ4IDU0MSA3OTYgNzY0IDc5NiAyMDM4IDAgMjgwMi0yNTUgMjQ0LTU1MSA0MDctODk4IDQ5My0xNjAgNDAtNDI2IDYwLTYwMCA0NnoiLz48cGF0aCBkPSJtMTA2OTAgODMzOWMtNjIzLTQ3LTExOTEtNDAwLTE1MTktOTQzLTM2Mi02MDItMzYyLTEzOTAgMC0xOTkyIDE5NC0zMjEgNDg4LTU5MSA4MTQtNzQ5IDI0NS0xMTkgNDUxLTE3NCA3MjUtMTk1IDc4OS01OSAxNTUyIDM4OCAxODkyIDExMDggNDE3IDg4MSAxMTYgMTkzNC03MDIgMjQ2NS0xOTggMTI4LTQ1NSAyMzItNjgyIDI3Ni05OSAxOS0zMzkgNDMtMzk4IDQwLTE0LTEtNzItNS0xMzAtMTB6Ii8+PHBhdGggZD0ibTE2OTAgMzg3NWMtNjg1LTk0LTEyNjMtNTM1LTE1MzQtMTE2OS0yNDctNTc2LTE5NC0xMjU0IDEzNy0xNzg1IDE0Mi0yMjggMzUzLTQ0NSA1NzctNTk1IDQyNi0yODQgOTY0LTM4OSAxNDY3LTI4NiA3NzcgMTYwIDEzNzYgNzcxIDE1MjQgMTU1NSAzMCAxNTcgMzcgNDQ5IDE1IDYwOS0xMTEgNzk0LTY4MCAxNDMxLTE0NTUgMTYzMS0yMDAgNTItNTE5IDY5LTczMSA0MHoiLz48cGF0aCBkPSJtNjEzNSAzODc0Yy03MjUtOTgtMTMzNy01OTgtMTU3OC0xMjkxLTE4Ni01MzItMTI3LTExMzUgMTU4LTE2MTkgNDIwLTcxMyAxMjQxLTEwODUgMjA1MC05MjggMzg2IDc1IDczMCAyNTkgMTAxMCA1NDEgNzU2IDc1OSA3NTMgMTk4NS01IDI3NDMtMzA3IDMwNy02OTUgNDk5LTExMjMgNTU1LTE0MiAxOC0zNzUgMTgtNTEyLTF6Ii8+PHBhdGggZD0ibTEwNTU1IDM4NzBjLTIxMS0zMi0zNjMtNzktNTYxLTE3NS01ODktMjg1LTk4OC04MzYtMTA4MC0xNDkxLTIyLTE2MC0xNS00NTIgMTUtNjA5IDE0OC03ODQgNzQ3LTEzOTUgMTUyNC0xNTU1IDUwMy0xMDMgMTA0MSAyIDE0NjcgMjg2IDIyNCAxNTAgNDM1IDM2NyA1NzcgNTk1IDMzMSA1MzEgMzg0IDEyMDkgMTM3IDE3ODUtMjQyIDU2Ny03MzMgOTg0LTEzMjkgMTEzMC0yMzAgNTYtNTE5IDY5LTc1MCAzNHoiLz48L2c+PC9zdmc+"
            name="Тимофей Фалдин"
            slogan="Пмогаю в создании личного бренда и построении заработка на нем за 3 мес."
            :socialNetworks="[{
              title: 'Telegram'
            }, {
              title: 'WhatsApp'
            }]"
          />
        </slide>
        <slide>
          <card-header
            avatar="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyODBwdCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDEyNzkgMTI4MCIgd2lkdGg9IjEyNzlwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNjczYWI3IiB0cmFuc2Zvcm09Im1hdHJpeCguMSAwIDAgLS4xIDAgMTI4MCkiPjxwYXRoIGQ9Im0xNzgwIDEyNzkzYy00NjQtNDctODU2LTIyNi0xMTc5LTUzOC0xNzQtMTY4LTI4NC0zMTYtMzkwLTUyNS0zNzgtNzQ0LTIzNi0xNjQ5IDM1Mi0yMjQ0IDQzNS00MzkgMTA1NC02NDYgMTY2My01NTcgMjIwIDMzIDM2OCA3OCA1NzAgMTc2IDU4OSAyODUgOTg4IDgzNiAxMDgwIDE0OTEgMjIgMTYwIDE1IDQ1Mi0xNSA2MDktMTYyIDg1Ny04NTYgMTQ5Ni0xNzIxIDE1ODQtOTYgMTAtMjgxIDEyLTM2MCA0eiIvPjxwYXRoIGQ9Im02MTY1IDEyNzg1Yy00NDUtNTQtODM1LTI0NS0xMTUwLTU2Mi03NTYtNzU5LTc1My0xOTg1IDUtMjc0MyAzNjktMzY5IDg1My01NzAgMTM3NS01NzAgOTEzIDAgMTcwMSA2MzIgMTg5OSAxNTIxIDE0NCA2NDktNTEgMTMyMi01MTkgMTc5Mi00MjYgNDI4LTEwMTkgNjM1LTE2MTAgNTYyeiIvPjxwYXRoIGQ9Im0xMDYzNiAxMjc5MGMtODYxLTk5LTE1NDYtNzM0LTE3MDctMTU4NS0zMC0xNTctMzctNDQ5LTE1LTYwOSA5Mi02NTUgNDkxLTEyMDYgMTA4MC0xNDkxIDIwMi05OCAzNTAtMTQzIDU3MC0xNzYgNjA5LTg5IDEyMjggMTE4IDE2NjMgNTU3IDU4OCA1OTUgNzMwIDE1MDAgMzUyIDIyNDQtMTA2IDIwOS0yMTYgMzU3LTM5MCA1MjUtMjkwIDI4MC02MzYgNDUzLTEwMzkgNTIwLTExMyAxOS00MDMgMjctNTE0IDE1eiIvPjxwYXRoIGQ9Im0xNzkyIDgzMzljLTMxMC0yNC02MzgtMTM1LTkwMi0zMDYtNzQ1LTQ4My0xMDY4LTE0MDMtNzkwLTIyNDUgMzI1LTk4MiAxMzYyLTE1MzYgMjM2Ni0xMjYzIDQ3MyAxMjkgODkzIDQ0OSAxMTUzIDg3OSAzNjIgNjAyIDM2MiAxMzkwIDAgMTk5Mi0xOTQgMzIxLTQ4OCA1OTEtODE0IDc0OS0xNzYgODYtMzI1IDEzNS01MTAgMTcwLTc3IDE0LTMyNCAzNi0zNzUgMzQtMTQtMS03MS01LTEyOC0xMHoiLz48cGF0aCBkPSJtNjI0NSA4MzQwYy0xMDE4LTg0LTE3OTUtOTI0LTE3OTUtMTk0MCAwLTg0NiA1NTEtMTYwMCAxMzU1LTE4NTQgMjA1LTY1IDM2My04OCA1OTAtODggNTE3IDAgOTc1IDE4NCAxMzQ4IDU0MSA3OTYgNzY0IDc5NiAyMDM4IDAgMjgwMi0yNTUgMjQ0LTU1MSA0MDctODk4IDQ5My0xNjAgNDAtNDI2IDYwLTYwMCA0NnoiLz48cGF0aCBkPSJtMTA2OTAgODMzOWMtNjIzLTQ3LTExOTEtNDAwLTE1MTktOTQzLTM2Mi02MDItMzYyLTEzOTAgMC0xOTkyIDE5NC0zMjEgNDg4LTU5MSA4MTQtNzQ5IDI0NS0xMTkgNDUxLTE3NCA3MjUtMTk1IDc4OS01OSAxNTUyIDM4OCAxODkyIDExMDggNDE3IDg4MSAxMTYgMTkzNC03MDIgMjQ2NS0xOTggMTI4LTQ1NSAyMzItNjgyIDI3Ni05OSAxOS0zMzkgNDMtMzk4IDQwLTE0LTEtNzItNS0xMzAtMTB6Ii8+PHBhdGggZD0ibTE2OTAgMzg3NWMtNjg1LTk0LTEyNjMtNTM1LTE1MzQtMTE2OS0yNDctNTc2LTE5NC0xMjU0IDEzNy0xNzg1IDE0Mi0yMjggMzUzLTQ0NSA1NzctNTk1IDQyNi0yODQgOTY0LTM4OSAxNDY3LTI4NiA3NzcgMTYwIDEzNzYgNzcxIDE1MjQgMTU1NSAzMCAxNTcgMzcgNDQ5IDE1IDYwOS0xMTEgNzk0LTY4MCAxNDMxLTE0NTUgMTYzMS0yMDAgNTItNTE5IDY5LTczMSA0MHoiLz48cGF0aCBkPSJtNjEzNSAzODc0Yy03MjUtOTgtMTMzNy01OTgtMTU3OC0xMjkxLTE4Ni01MzItMTI3LTExMzUgMTU4LTE2MTkgNDIwLTcxMyAxMjQxLTEwODUgMjA1MC05MjggMzg2IDc1IDczMCAyNTkgMTAxMCA1NDEgNzU2IDc1OSA3NTMgMTk4NS01IDI3NDMtMzA3IDMwNy02OTUgNDk5LTExMjMgNTU1LTE0MiAxOC0zNzUgMTgtNTEyLTF6Ii8+PHBhdGggZD0ibTEwNTU1IDM4NzBjLTIxMS0zMi0zNjMtNzktNTYxLTE3NS01ODktMjg1LTk4OC04MzYtMTA4MC0xNDkxLTIyLTE2MC0xNS00NTIgMTUtNjA5IDE0OC03ODQgNzQ3LTEzOTUgMTUyNC0xNTU1IDUwMy0xMDMgMTA0MSAyIDE0NjcgMjg2IDIyNCAxNTAgNDM1IDM2NyA1NzcgNTk1IDMzMSA1MzEgMzg0IDEyMDkgMTM3IDE3ODUtMjQyIDU2Ny03MzMgOTg0LTEzMjkgMTEzMC0yMzAgNTYtNTE5IDY5LTc1MCAzNHoiLz48L2c+PC9zdmc+"
            name="Тимофей Фалдин"
            slogan="Пмогаю в создании личного бренда и построении заработка на нем за 3 мес."
            :socialNetworks="[{
              title: 'Telegram'
            }, {
              title: 'WhatsApp'
            }]"
          />
        </slide>
        <slide>
          <card-header
            avatar="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyODBwdCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDEyNzkgMTI4MCIgd2lkdGg9IjEyNzlwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNjczYWI3IiB0cmFuc2Zvcm09Im1hdHJpeCguMSAwIDAgLS4xIDAgMTI4MCkiPjxwYXRoIGQ9Im0xNzgwIDEyNzkzYy00NjQtNDctODU2LTIyNi0xMTc5LTUzOC0xNzQtMTY4LTI4NC0zMTYtMzkwLTUyNS0zNzgtNzQ0LTIzNi0xNjQ5IDM1Mi0yMjQ0IDQzNS00MzkgMTA1NC02NDYgMTY2My01NTcgMjIwIDMzIDM2OCA3OCA1NzAgMTc2IDU4OSAyODUgOTg4IDgzNiAxMDgwIDE0OTEgMjIgMTYwIDE1IDQ1Mi0xNSA2MDktMTYyIDg1Ny04NTYgMTQ5Ni0xNzIxIDE1ODQtOTYgMTAtMjgxIDEyLTM2MCA0eiIvPjxwYXRoIGQ9Im02MTY1IDEyNzg1Yy00NDUtNTQtODM1LTI0NS0xMTUwLTU2Mi03NTYtNzU5LTc1My0xOTg1IDUtMjc0MyAzNjktMzY5IDg1My01NzAgMTM3NS01NzAgOTEzIDAgMTcwMSA2MzIgMTg5OSAxNTIxIDE0NCA2NDktNTEgMTMyMi01MTkgMTc5Mi00MjYgNDI4LTEwMTkgNjM1LTE2MTAgNTYyeiIvPjxwYXRoIGQ9Im0xMDYzNiAxMjc5MGMtODYxLTk5LTE1NDYtNzM0LTE3MDctMTU4NS0zMC0xNTctMzctNDQ5LTE1LTYwOSA5Mi02NTUgNDkxLTEyMDYgMTA4MC0xNDkxIDIwMi05OCAzNTAtMTQzIDU3MC0xNzYgNjA5LTg5IDEyMjggMTE4IDE2NjMgNTU3IDU4OCA1OTUgNzMwIDE1MDAgMzUyIDIyNDQtMTA2IDIwOS0yMTYgMzU3LTM5MCA1MjUtMjkwIDI4MC02MzYgNDUzLTEwMzkgNTIwLTExMyAxOS00MDMgMjctNTE0IDE1eiIvPjxwYXRoIGQ9Im0xNzkyIDgzMzljLTMxMC0yNC02MzgtMTM1LTkwMi0zMDYtNzQ1LTQ4My0xMDY4LTE0MDMtNzkwLTIyNDUgMzI1LTk4MiAxMzYyLTE1MzYgMjM2Ni0xMjYzIDQ3MyAxMjkgODkzIDQ0OSAxMTUzIDg3OSAzNjIgNjAyIDM2MiAxMzkwIDAgMTk5Mi0xOTQgMzIxLTQ4OCA1OTEtODE0IDc0OS0xNzYgODYtMzI1IDEzNS01MTAgMTcwLTc3IDE0LTMyNCAzNi0zNzUgMzQtMTQtMS03MS01LTEyOC0xMHoiLz48cGF0aCBkPSJtNjI0NSA4MzQwYy0xMDE4LTg0LTE3OTUtOTI0LTE3OTUtMTk0MCAwLTg0NiA1NTEtMTYwMCAxMzU1LTE4NTQgMjA1LTY1IDM2My04OCA1OTAtODggNTE3IDAgOTc1IDE4NCAxMzQ4IDU0MSA3OTYgNzY0IDc5NiAyMDM4IDAgMjgwMi0yNTUgMjQ0LTU1MSA0MDctODk4IDQ5My0xNjAgNDAtNDI2IDYwLTYwMCA0NnoiLz48cGF0aCBkPSJtMTA2OTAgODMzOWMtNjIzLTQ3LTExOTEtNDAwLTE1MTktOTQzLTM2Mi02MDItMzYyLTEzOTAgMC0xOTkyIDE5NC0zMjEgNDg4LTU5MSA4MTQtNzQ5IDI0NS0xMTkgNDUxLTE3NCA3MjUtMTk1IDc4OS01OSAxNTUyIDM4OCAxODkyIDExMDggNDE3IDg4MSAxMTYgMTkzNC03MDIgMjQ2NS0xOTggMTI4LTQ1NSAyMzItNjgyIDI3Ni05OSAxOS0zMzkgNDMtMzk4IDQwLTE0LTEtNzItNS0xMzAtMTB6Ii8+PHBhdGggZD0ibTE2OTAgMzg3NWMtNjg1LTk0LTEyNjMtNTM1LTE1MzQtMTE2OS0yNDctNTc2LTE5NC0xMjU0IDEzNy0xNzg1IDE0Mi0yMjggMzUzLTQ0NSA1NzctNTk1IDQyNi0yODQgOTY0LTM4OSAxNDY3LTI4NiA3NzcgMTYwIDEzNzYgNzcxIDE1MjQgMTU1NSAzMCAxNTcgMzcgNDQ5IDE1IDYwOS0xMTEgNzk0LTY4MCAxNDMxLTE0NTUgMTYzMS0yMDAgNTItNTE5IDY5LTczMSA0MHoiLz48cGF0aCBkPSJtNjEzNSAzODc0Yy03MjUtOTgtMTMzNy01OTgtMTU3OC0xMjkxLTE4Ni01MzItMTI3LTExMzUgMTU4LTE2MTkgNDIwLTcxMyAxMjQxLTEwODUgMjA1MC05MjggMzg2IDc1IDczMCAyNTkgMTAxMCA1NDEgNzU2IDc1OSA3NTMgMTk4NS01IDI3NDMtMzA3IDMwNy02OTUgNDk5LTExMjMgNTU1LTE0MiAxOC0zNzUgMTgtNTEyLTF6Ii8+PHBhdGggZD0ibTEwNTU1IDM4NzBjLTIxMS0zMi0zNjMtNzktNTYxLTE3NS01ODktMjg1LTk4OC04MzYtMTA4MC0xNDkxLTIyLTE2MC0xNS00NTIgMTUtNjA5IDE0OC03ODQgNzQ3LTEzOTUgMTUyNC0xNTU1IDUwMy0xMDMgMTA0MSAyIDE0NjcgMjg2IDIyNCAxNTAgNDM1IDM2NyA1NzcgNTk1IDMzMSA1MzEgMzg0IDEyMDkgMTM3IDE3ODUtMjQyIDU2Ny03MzMgOTg0LTEzMjkgMTEzMC0yMzAgNTYtNTE5IDY5LTc1MCAzNHoiLz48L2c+PC9zdmc+"
            name="Тимофей Фалдин"
            slogan="Пмогаю в создании личного бренда и построении заработка на нем за 3 мес."
            :socialNetworks="[{
              title: 'Telegram'
            }, {
              title: 'WhatsApp'
            }]"
          />
        </slide>
        <slide>
          <card-header
            avatar="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyODBwdCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDEyNzkgMTI4MCIgd2lkdGg9IjEyNzlwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNjczYWI3IiB0cmFuc2Zvcm09Im1hdHJpeCguMSAwIDAgLS4xIDAgMTI4MCkiPjxwYXRoIGQ9Im0xNzgwIDEyNzkzYy00NjQtNDctODU2LTIyNi0xMTc5LTUzOC0xNzQtMTY4LTI4NC0zMTYtMzkwLTUyNS0zNzgtNzQ0LTIzNi0xNjQ5IDM1Mi0yMjQ0IDQzNS00MzkgMTA1NC02NDYgMTY2My01NTcgMjIwIDMzIDM2OCA3OCA1NzAgMTc2IDU4OSAyODUgOTg4IDgzNiAxMDgwIDE0OTEgMjIgMTYwIDE1IDQ1Mi0xNSA2MDktMTYyIDg1Ny04NTYgMTQ5Ni0xNzIxIDE1ODQtOTYgMTAtMjgxIDEyLTM2MCA0eiIvPjxwYXRoIGQ9Im02MTY1IDEyNzg1Yy00NDUtNTQtODM1LTI0NS0xMTUwLTU2Mi03NTYtNzU5LTc1My0xOTg1IDUtMjc0MyAzNjktMzY5IDg1My01NzAgMTM3NS01NzAgOTEzIDAgMTcwMSA2MzIgMTg5OSAxNTIxIDE0NCA2NDktNTEgMTMyMi01MTkgMTc5Mi00MjYgNDI4LTEwMTkgNjM1LTE2MTAgNTYyeiIvPjxwYXRoIGQ9Im0xMDYzNiAxMjc5MGMtODYxLTk5LTE1NDYtNzM0LTE3MDctMTU4NS0zMC0xNTctMzctNDQ5LTE1LTYwOSA5Mi02NTUgNDkxLTEyMDYgMTA4MC0xNDkxIDIwMi05OCAzNTAtMTQzIDU3MC0xNzYgNjA5LTg5IDEyMjggMTE4IDE2NjMgNTU3IDU4OCA1OTUgNzMwIDE1MDAgMzUyIDIyNDQtMTA2IDIwOS0yMTYgMzU3LTM5MCA1MjUtMjkwIDI4MC02MzYgNDUzLTEwMzkgNTIwLTExMyAxOS00MDMgMjctNTE0IDE1eiIvPjxwYXRoIGQ9Im0xNzkyIDgzMzljLTMxMC0yNC02MzgtMTM1LTkwMi0zMDYtNzQ1LTQ4My0xMDY4LTE0MDMtNzkwLTIyNDUgMzI1LTk4MiAxMzYyLTE1MzYgMjM2Ni0xMjYzIDQ3MyAxMjkgODkzIDQ0OSAxMTUzIDg3OSAzNjIgNjAyIDM2MiAxMzkwIDAgMTk5Mi0xOTQgMzIxLTQ4OCA1OTEtODE0IDc0OS0xNzYgODYtMzI1IDEzNS01MTAgMTcwLTc3IDE0LTMyNCAzNi0zNzUgMzQtMTQtMS03MS01LTEyOC0xMHoiLz48cGF0aCBkPSJtNjI0NSA4MzQwYy0xMDE4LTg0LTE3OTUtOTI0LTE3OTUtMTk0MCAwLTg0NiA1NTEtMTYwMCAxMzU1LTE4NTQgMjA1LTY1IDM2My04OCA1OTAtODggNTE3IDAgOTc1IDE4NCAxMzQ4IDU0MSA3OTYgNzY0IDc5NiAyMDM4IDAgMjgwMi0yNTUgMjQ0LTU1MSA0MDctODk4IDQ5My0xNjAgNDAtNDI2IDYwLTYwMCA0NnoiLz48cGF0aCBkPSJtMTA2OTAgODMzOWMtNjIzLTQ3LTExOTEtNDAwLTE1MTktOTQzLTM2Mi02MDItMzYyLTEzOTAgMC0xOTkyIDE5NC0zMjEgNDg4LTU5MSA4MTQtNzQ5IDI0NS0xMTkgNDUxLTE3NCA3MjUtMTk1IDc4OS01OSAxNTUyIDM4OCAxODkyIDExMDggNDE3IDg4MSAxMTYgMTkzNC03MDIgMjQ2NS0xOTggMTI4LTQ1NSAyMzItNjgyIDI3Ni05OSAxOS0zMzkgNDMtMzk4IDQwLTE0LTEtNzItNS0xMzAtMTB6Ii8+PHBhdGggZD0ibTE2OTAgMzg3NWMtNjg1LTk0LTEyNjMtNTM1LTE1MzQtMTE2OS0yNDctNTc2LTE5NC0xMjU0IDEzNy0xNzg1IDE0Mi0yMjggMzUzLTQ0NSA1NzctNTk1IDQyNi0yODQgOTY0LTM4OSAxNDY3LTI4NiA3NzcgMTYwIDEzNzYgNzcxIDE1MjQgMTU1NSAzMCAxNTcgMzcgNDQ5IDE1IDYwOS0xMTEgNzk0LTY4MCAxNDMxLTE0NTUgMTYzMS0yMDAgNTItNTE5IDY5LTczMSA0MHoiLz48cGF0aCBkPSJtNjEzNSAzODc0Yy03MjUtOTgtMTMzNy01OTgtMTU3OC0xMjkxLTE4Ni01MzItMTI3LTExMzUgMTU4LTE2MTkgNDIwLTcxMyAxMjQxLTEwODUgMjA1MC05MjggMzg2IDc1IDczMCAyNTkgMTAxMCA1NDEgNzU2IDc1OSA3NTMgMTk4NS01IDI3NDMtMzA3IDMwNy02OTUgNDk5LTExMjMgNTU1LTE0MiAxOC0zNzUgMTgtNTEyLTF6Ii8+PHBhdGggZD0ibTEwNTU1IDM4NzBjLTIxMS0zMi0zNjMtNzktNTYxLTE3NS01ODktMjg1LTk4OC04MzYtMTA4MC0xNDkxLTIyLTE2MC0xNS00NTIgMTUtNjA5IDE0OC03ODQgNzQ3LTEzOTUgMTUyNC0xNTU1IDUwMy0xMDMgMTA0MSAyIDE0NjcgMjg2IDIyNCAxNTAgNDM1IDM2NyA1NzcgNTk1IDMzMSA1MzEgMzg0IDEyMDkgMTM3IDE3ODUtMjQyIDU2Ny03MzMgOTg0LTEzMjkgMTEzMC0yMzAgNTYtNTE5IDY5LTc1MCAzNHoiLz48L2c+PC9zdmc+"
            name="Тимофей Фалдин"
            slogan="Пмогаю в создании личного бренда и построении заработка на нем за 3 мес."
            :socialNetworks="[{
              title: 'Telegram'
            }, {
              title: 'WhatsApp'
            }]"
          />
        </slide>
        <slide>
          <card-header
            avatar="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyODBwdCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDEyNzkgMTI4MCIgd2lkdGg9IjEyNzlwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNjczYWI3IiB0cmFuc2Zvcm09Im1hdHJpeCguMSAwIDAgLS4xIDAgMTI4MCkiPjxwYXRoIGQ9Im0xNzgwIDEyNzkzYy00NjQtNDctODU2LTIyNi0xMTc5LTUzOC0xNzQtMTY4LTI4NC0zMTYtMzkwLTUyNS0zNzgtNzQ0LTIzNi0xNjQ5IDM1Mi0yMjQ0IDQzNS00MzkgMTA1NC02NDYgMTY2My01NTcgMjIwIDMzIDM2OCA3OCA1NzAgMTc2IDU4OSAyODUgOTg4IDgzNiAxMDgwIDE0OTEgMjIgMTYwIDE1IDQ1Mi0xNSA2MDktMTYyIDg1Ny04NTYgMTQ5Ni0xNzIxIDE1ODQtOTYgMTAtMjgxIDEyLTM2MCA0eiIvPjxwYXRoIGQ9Im02MTY1IDEyNzg1Yy00NDUtNTQtODM1LTI0NS0xMTUwLTU2Mi03NTYtNzU5LTc1My0xOTg1IDUtMjc0MyAzNjktMzY5IDg1My01NzAgMTM3NS01NzAgOTEzIDAgMTcwMSA2MzIgMTg5OSAxNTIxIDE0NCA2NDktNTEgMTMyMi01MTkgMTc5Mi00MjYgNDI4LTEwMTkgNjM1LTE2MTAgNTYyeiIvPjxwYXRoIGQ9Im0xMDYzNiAxMjc5MGMtODYxLTk5LTE1NDYtNzM0LTE3MDctMTU4NS0zMC0xNTctMzctNDQ5LTE1LTYwOSA5Mi02NTUgNDkxLTEyMDYgMTA4MC0xNDkxIDIwMi05OCAzNTAtMTQzIDU3MC0xNzYgNjA5LTg5IDEyMjggMTE4IDE2NjMgNTU3IDU4OCA1OTUgNzMwIDE1MDAgMzUyIDIyNDQtMTA2IDIwOS0yMTYgMzU3LTM5MCA1MjUtMjkwIDI4MC02MzYgNDUzLTEwMzkgNTIwLTExMyAxOS00MDMgMjctNTE0IDE1eiIvPjxwYXRoIGQ9Im0xNzkyIDgzMzljLTMxMC0yNC02MzgtMTM1LTkwMi0zMDYtNzQ1LTQ4My0xMDY4LTE0MDMtNzkwLTIyNDUgMzI1LTk4MiAxMzYyLTE1MzYgMjM2Ni0xMjYzIDQ3MyAxMjkgODkzIDQ0OSAxMTUzIDg3OSAzNjIgNjAyIDM2MiAxMzkwIDAgMTk5Mi0xOTQgMzIxLTQ4OCA1OTEtODE0IDc0OS0xNzYgODYtMzI1IDEzNS01MTAgMTcwLTc3IDE0LTMyNCAzNi0zNzUgMzQtMTQtMS03MS01LTEyOC0xMHoiLz48cGF0aCBkPSJtNjI0NSA4MzQwYy0xMDE4LTg0LTE3OTUtOTI0LTE3OTUtMTk0MCAwLTg0NiA1NTEtMTYwMCAxMzU1LTE4NTQgMjA1LTY1IDM2My04OCA1OTAtODggNTE3IDAgOTc1IDE4NCAxMzQ4IDU0MSA3OTYgNzY0IDc5NiAyMDM4IDAgMjgwMi0yNTUgMjQ0LTU1MSA0MDctODk4IDQ5My0xNjAgNDAtNDI2IDYwLTYwMCA0NnoiLz48cGF0aCBkPSJtMTA2OTAgODMzOWMtNjIzLTQ3LTExOTEtNDAwLTE1MTktOTQzLTM2Mi02MDItMzYyLTEzOTAgMC0xOTkyIDE5NC0zMjEgNDg4LTU5MSA4MTQtNzQ5IDI0NS0xMTkgNDUxLTE3NCA3MjUtMTk1IDc4OS01OSAxNTUyIDM4OCAxODkyIDExMDggNDE3IDg4MSAxMTYgMTkzNC03MDIgMjQ2NS0xOTggMTI4LTQ1NSAyMzItNjgyIDI3Ni05OSAxOS0zMzkgNDMtMzk4IDQwLTE0LTEtNzItNS0xMzAtMTB6Ii8+PHBhdGggZD0ibTE2OTAgMzg3NWMtNjg1LTk0LTEyNjMtNTM1LTE1MzQtMTE2OS0yNDctNTc2LTE5NC0xMjU0IDEzNy0xNzg1IDE0Mi0yMjggMzUzLTQ0NSA1NzctNTk1IDQyNi0yODQgOTY0LTM4OSAxNDY3LTI4NiA3NzcgMTYwIDEzNzYgNzcxIDE1MjQgMTU1NSAzMCAxNTcgMzcgNDQ5IDE1IDYwOS0xMTEgNzk0LTY4MCAxNDMxLTE0NTUgMTYzMS0yMDAgNTItNTE5IDY5LTczMSA0MHoiLz48cGF0aCBkPSJtNjEzNSAzODc0Yy03MjUtOTgtMTMzNy01OTgtMTU3OC0xMjkxLTE4Ni01MzItMTI3LTExMzUgMTU4LTE2MTkgNDIwLTcxMyAxMjQxLTEwODUgMjA1MC05MjggMzg2IDc1IDczMCAyNTkgMTAxMCA1NDEgNzU2IDc1OSA3NTMgMTk4NS01IDI3NDMtMzA3IDMwNy02OTUgNDk5LTExMjMgNTU1LTE0MiAxOC0zNzUgMTgtNTEyLTF6Ii8+PHBhdGggZD0ibTEwNTU1IDM4NzBjLTIxMS0zMi0zNjMtNzktNTYxLTE3NS01ODktMjg1LTk4OC04MzYtMTA4MC0xNDkxLTIyLTE2MC0xNS00NTIgMTUtNjA5IDE0OC03ODQgNzQ3LTEzOTUgMTUyNC0xNTU1IDUwMy0xMDMgMTA0MSAyIDE0NjcgMjg2IDIyNCAxNTAgNDM1IDM2NyA1NzcgNTk1IDMzMSA1MzEgMzg0IDEyMDkgMTM3IDE3ODUtMjQyIDU2Ny03MzMgOTg0LTEzMjkgMTEzMC0yMzAgNTYtNTE5IDY5LTc1MCAzNHoiLz48L2c+PC9zdmc+"
            name="Тимофей Фалдин"
            slogan="Пмогаю в создании личного бренда и построении заработка на нем за 3 мес."
            :socialNetworks="[{
              title: 'Telegram'
            }, {
              title: 'WhatsApp'
            }]"
          />
        </slide>
        <slide>
          <card-header
            avatar="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyODBwdCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDEyNzkgMTI4MCIgd2lkdGg9IjEyNzlwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNjczYWI3IiB0cmFuc2Zvcm09Im1hdHJpeCguMSAwIDAgLS4xIDAgMTI4MCkiPjxwYXRoIGQ9Im0xNzgwIDEyNzkzYy00NjQtNDctODU2LTIyNi0xMTc5LTUzOC0xNzQtMTY4LTI4NC0zMTYtMzkwLTUyNS0zNzgtNzQ0LTIzNi0xNjQ5IDM1Mi0yMjQ0IDQzNS00MzkgMTA1NC02NDYgMTY2My01NTcgMjIwIDMzIDM2OCA3OCA1NzAgMTc2IDU4OSAyODUgOTg4IDgzNiAxMDgwIDE0OTEgMjIgMTYwIDE1IDQ1Mi0xNSA2MDktMTYyIDg1Ny04NTYgMTQ5Ni0xNzIxIDE1ODQtOTYgMTAtMjgxIDEyLTM2MCA0eiIvPjxwYXRoIGQ9Im02MTY1IDEyNzg1Yy00NDUtNTQtODM1LTI0NS0xMTUwLTU2Mi03NTYtNzU5LTc1My0xOTg1IDUtMjc0MyAzNjktMzY5IDg1My01NzAgMTM3NS01NzAgOTEzIDAgMTcwMSA2MzIgMTg5OSAxNTIxIDE0NCA2NDktNTEgMTMyMi01MTkgMTc5Mi00MjYgNDI4LTEwMTkgNjM1LTE2MTAgNTYyeiIvPjxwYXRoIGQ9Im0xMDYzNiAxMjc5MGMtODYxLTk5LTE1NDYtNzM0LTE3MDctMTU4NS0zMC0xNTctMzctNDQ5LTE1LTYwOSA5Mi02NTUgNDkxLTEyMDYgMTA4MC0xNDkxIDIwMi05OCAzNTAtMTQzIDU3MC0xNzYgNjA5LTg5IDEyMjggMTE4IDE2NjMgNTU3IDU4OCA1OTUgNzMwIDE1MDAgMzUyIDIyNDQtMTA2IDIwOS0yMTYgMzU3LTM5MCA1MjUtMjkwIDI4MC02MzYgNDUzLTEwMzkgNTIwLTExMyAxOS00MDMgMjctNTE0IDE1eiIvPjxwYXRoIGQ9Im0xNzkyIDgzMzljLTMxMC0yNC02MzgtMTM1LTkwMi0zMDYtNzQ1LTQ4My0xMDY4LTE0MDMtNzkwLTIyNDUgMzI1LTk4MiAxMzYyLTE1MzYgMjM2Ni0xMjYzIDQ3MyAxMjkgODkzIDQ0OSAxMTUzIDg3OSAzNjIgNjAyIDM2MiAxMzkwIDAgMTk5Mi0xOTQgMzIxLTQ4OCA1OTEtODE0IDc0OS0xNzYgODYtMzI1IDEzNS01MTAgMTcwLTc3IDE0LTMyNCAzNi0zNzUgMzQtMTQtMS03MS01LTEyOC0xMHoiLz48cGF0aCBkPSJtNjI0NSA4MzQwYy0xMDE4LTg0LTE3OTUtOTI0LTE3OTUtMTk0MCAwLTg0NiA1NTEtMTYwMCAxMzU1LTE4NTQgMjA1LTY1IDM2My04OCA1OTAtODggNTE3IDAgOTc1IDE4NCAxMzQ4IDU0MSA3OTYgNzY0IDc5NiAyMDM4IDAgMjgwMi0yNTUgMjQ0LTU1MSA0MDctODk4IDQ5My0xNjAgNDAtNDI2IDYwLTYwMCA0NnoiLz48cGF0aCBkPSJtMTA2OTAgODMzOWMtNjIzLTQ3LTExOTEtNDAwLTE1MTktOTQzLTM2Mi02MDItMzYyLTEzOTAgMC0xOTkyIDE5NC0zMjEgNDg4LTU5MSA4MTQtNzQ5IDI0NS0xMTkgNDUxLTE3NCA3MjUtMTk1IDc4OS01OSAxNTUyIDM4OCAxODkyIDExMDggNDE3IDg4MSAxMTYgMTkzNC03MDIgMjQ2NS0xOTggMTI4LTQ1NSAyMzItNjgyIDI3Ni05OSAxOS0zMzkgNDMtMzk4IDQwLTE0LTEtNzItNS0xMzAtMTB6Ii8+PHBhdGggZD0ibTE2OTAgMzg3NWMtNjg1LTk0LTEyNjMtNTM1LTE1MzQtMTE2OS0yNDctNTc2LTE5NC0xMjU0IDEzNy0xNzg1IDE0Mi0yMjggMzUzLTQ0NSA1NzctNTk1IDQyNi0yODQgOTY0LTM4OSAxNDY3LTI4NiA3NzcgMTYwIDEzNzYgNzcxIDE1MjQgMTU1NSAzMCAxNTcgMzcgNDQ5IDE1IDYwOS0xMTEgNzk0LTY4MCAxNDMxLTE0NTUgMTYzMS0yMDAgNTItNTE5IDY5LTczMSA0MHoiLz48cGF0aCBkPSJtNjEzNSAzODc0Yy03MjUtOTgtMTMzNy01OTgtMTU3OC0xMjkxLTE4Ni01MzItMTI3LTExMzUgMTU4LTE2MTkgNDIwLTcxMyAxMjQxLTEwODUgMjA1MC05MjggMzg2IDc1IDczMCAyNTkgMTAxMCA1NDEgNzU2IDc1OSA3NTMgMTk4NS01IDI3NDMtMzA3IDMwNy02OTUgNDk5LTExMjMgNTU1LTE0MiAxOC0zNzUgMTgtNTEyLTF6Ii8+PHBhdGggZD0ibTEwNTU1IDM4NzBjLTIxMS0zMi0zNjMtNzktNTYxLTE3NS01ODktMjg1LTk4OC04MzYtMTA4MC0xNDkxLTIyLTE2MC0xNS00NTIgMTUtNjA5IDE0OC03ODQgNzQ3LTEzOTUgMTUyNC0xNTU1IDUwMy0xMDMgMTA0MSAyIDE0NjcgMjg2IDIyNCAxNTAgNDM1IDM2NyA1NzcgNTk1IDMzMSA1MzEgMzg0IDEyMDkgMTM3IDE3ODUtMjQyIDU2Ny03MzMgOTg0LTEzMjkgMTEzMC0yMzAgNTYtNTE5IDY5LTc1MCAzNHoiLz48L2c+PC9zdmc+"
            name="Тимофей Фалдин"
            slogan="Пмогаю в создании личного бренда и построении заработка на нем за 3 мес."
            :socialNetworks="[{
              title: 'Telegram'
            }, {
              title: 'WhatsApp'
            }]"
          />
        </slide>
        <slide>
          <card-header
            avatar="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyODBwdCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDEyNzkgMTI4MCIgd2lkdGg9IjEyNzlwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNjczYWI3IiB0cmFuc2Zvcm09Im1hdHJpeCguMSAwIDAgLS4xIDAgMTI4MCkiPjxwYXRoIGQ9Im0xNzgwIDEyNzkzYy00NjQtNDctODU2LTIyNi0xMTc5LTUzOC0xNzQtMTY4LTI4NC0zMTYtMzkwLTUyNS0zNzgtNzQ0LTIzNi0xNjQ5IDM1Mi0yMjQ0IDQzNS00MzkgMTA1NC02NDYgMTY2My01NTcgMjIwIDMzIDM2OCA3OCA1NzAgMTc2IDU4OSAyODUgOTg4IDgzNiAxMDgwIDE0OTEgMjIgMTYwIDE1IDQ1Mi0xNSA2MDktMTYyIDg1Ny04NTYgMTQ5Ni0xNzIxIDE1ODQtOTYgMTAtMjgxIDEyLTM2MCA0eiIvPjxwYXRoIGQ9Im02MTY1IDEyNzg1Yy00NDUtNTQtODM1LTI0NS0xMTUwLTU2Mi03NTYtNzU5LTc1My0xOTg1IDUtMjc0MyAzNjktMzY5IDg1My01NzAgMTM3NS01NzAgOTEzIDAgMTcwMSA2MzIgMTg5OSAxNTIxIDE0NCA2NDktNTEgMTMyMi01MTkgMTc5Mi00MjYgNDI4LTEwMTkgNjM1LTE2MTAgNTYyeiIvPjxwYXRoIGQ9Im0xMDYzNiAxMjc5MGMtODYxLTk5LTE1NDYtNzM0LTE3MDctMTU4NS0zMC0xNTctMzctNDQ5LTE1LTYwOSA5Mi02NTUgNDkxLTEyMDYgMTA4MC0xNDkxIDIwMi05OCAzNTAtMTQzIDU3MC0xNzYgNjA5LTg5IDEyMjggMTE4IDE2NjMgNTU3IDU4OCA1OTUgNzMwIDE1MDAgMzUyIDIyNDQtMTA2IDIwOS0yMTYgMzU3LTM5MCA1MjUtMjkwIDI4MC02MzYgNDUzLTEwMzkgNTIwLTExMyAxOS00MDMgMjctNTE0IDE1eiIvPjxwYXRoIGQ9Im0xNzkyIDgzMzljLTMxMC0yNC02MzgtMTM1LTkwMi0zMDYtNzQ1LTQ4My0xMDY4LTE0MDMtNzkwLTIyNDUgMzI1LTk4MiAxMzYyLTE1MzYgMjM2Ni0xMjYzIDQ3MyAxMjkgODkzIDQ0OSAxMTUzIDg3OSAzNjIgNjAyIDM2MiAxMzkwIDAgMTk5Mi0xOTQgMzIxLTQ4OCA1OTEtODE0IDc0OS0xNzYgODYtMzI1IDEzNS01MTAgMTcwLTc3IDE0LTMyNCAzNi0zNzUgMzQtMTQtMS03MS01LTEyOC0xMHoiLz48cGF0aCBkPSJtNjI0NSA4MzQwYy0xMDE4LTg0LTE3OTUtOTI0LTE3OTUtMTk0MCAwLTg0NiA1NTEtMTYwMCAxMzU1LTE4NTQgMjA1LTY1IDM2My04OCA1OTAtODggNTE3IDAgOTc1IDE4NCAxMzQ4IDU0MSA3OTYgNzY0IDc5NiAyMDM4IDAgMjgwMi0yNTUgMjQ0LTU1MSA0MDctODk4IDQ5My0xNjAgNDAtNDI2IDYwLTYwMCA0NnoiLz48cGF0aCBkPSJtMTA2OTAgODMzOWMtNjIzLTQ3LTExOTEtNDAwLTE1MTktOTQzLTM2Mi02MDItMzYyLTEzOTAgMC0xOTkyIDE5NC0zMjEgNDg4LTU5MSA4MTQtNzQ5IDI0NS0xMTkgNDUxLTE3NCA3MjUtMTk1IDc4OS01OSAxNTUyIDM4OCAxODkyIDExMDggNDE3IDg4MSAxMTYgMTkzNC03MDIgMjQ2NS0xOTggMTI4LTQ1NSAyMzItNjgyIDI3Ni05OSAxOS0zMzkgNDMtMzk4IDQwLTE0LTEtNzItNS0xMzAtMTB6Ii8+PHBhdGggZD0ibTE2OTAgMzg3NWMtNjg1LTk0LTEyNjMtNTM1LTE1MzQtMTE2OS0yNDctNTc2LTE5NC0xMjU0IDEzNy0xNzg1IDE0Mi0yMjggMzUzLTQ0NSA1NzctNTk1IDQyNi0yODQgOTY0LTM4OSAxNDY3LTI4NiA3NzcgMTYwIDEzNzYgNzcxIDE1MjQgMTU1NSAzMCAxNTcgMzcgNDQ5IDE1IDYwOS0xMTEgNzk0LTY4MCAxNDMxLTE0NTUgMTYzMS0yMDAgNTItNTE5IDY5LTczMSA0MHoiLz48cGF0aCBkPSJtNjEzNSAzODc0Yy03MjUtOTgtMTMzNy01OTgtMTU3OC0xMjkxLTE4Ni01MzItMTI3LTExMzUgMTU4LTE2MTkgNDIwLTcxMyAxMjQxLTEwODUgMjA1MC05MjggMzg2IDc1IDczMCAyNTkgMTAxMCA1NDEgNzU2IDc1OSA3NTMgMTk4NS01IDI3NDMtMzA3IDMwNy02OTUgNDk5LTExMjMgNTU1LTE0MiAxOC0zNzUgMTgtNTEyLTF6Ii8+PHBhdGggZD0ibTEwNTU1IDM4NzBjLTIxMS0zMi0zNjMtNzktNTYxLTE3NS01ODktMjg1LTk4OC04MzYtMTA4MC0xNDkxLTIyLTE2MC0xNS00NTIgMTUtNjA5IDE0OC03ODQgNzQ3LTEzOTUgMTUyNC0xNTU1IDUwMy0xMDMgMTA0MSAyIDE0NjcgMjg2IDIyNCAxNTAgNDM1IDM2NyA1NzcgNTk1IDMzMSA1MzEgMzg0IDEyMDkgMTM3IDE3ODUtMjQyIDU2Ny03MzMgOTg0LTEzMjkgMTEzMC0yMzAgNTYtNTE5IDY5LTc1MCAzNHoiLz48L2c+PC9zdmc+"
            name="Тимофей Фалдин"
            slogan="Пмогаю в создании личного бренда и построении заработка на нем за 3 мес."
            :socialNetworks="[{
              title: 'Telegram'
            }, {
              title: 'WhatsApp'
            }]"
          />
        </slide>
        <slide>
          <card-header
            avatar="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyODBwdCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDEyNzkgMTI4MCIgd2lkdGg9IjEyNzlwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjNjczYWI3IiB0cmFuc2Zvcm09Im1hdHJpeCguMSAwIDAgLS4xIDAgMTI4MCkiPjxwYXRoIGQ9Im0xNzgwIDEyNzkzYy00NjQtNDctODU2LTIyNi0xMTc5LTUzOC0xNzQtMTY4LTI4NC0zMTYtMzkwLTUyNS0zNzgtNzQ0LTIzNi0xNjQ5IDM1Mi0yMjQ0IDQzNS00MzkgMTA1NC02NDYgMTY2My01NTcgMjIwIDMzIDM2OCA3OCA1NzAgMTc2IDU4OSAyODUgOTg4IDgzNiAxMDgwIDE0OTEgMjIgMTYwIDE1IDQ1Mi0xNSA2MDktMTYyIDg1Ny04NTYgMTQ5Ni0xNzIxIDE1ODQtOTYgMTAtMjgxIDEyLTM2MCA0eiIvPjxwYXRoIGQ9Im02MTY1IDEyNzg1Yy00NDUtNTQtODM1LTI0NS0xMTUwLTU2Mi03NTYtNzU5LTc1My0xOTg1IDUtMjc0MyAzNjktMzY5IDg1My01NzAgMTM3NS01NzAgOTEzIDAgMTcwMSA2MzIgMTg5OSAxNTIxIDE0NCA2NDktNTEgMTMyMi01MTkgMTc5Mi00MjYgNDI4LTEwMTkgNjM1LTE2MTAgNTYyeiIvPjxwYXRoIGQ9Im0xMDYzNiAxMjc5MGMtODYxLTk5LTE1NDYtNzM0LTE3MDctMTU4NS0zMC0xNTctMzctNDQ5LTE1LTYwOSA5Mi02NTUgNDkxLTEyMDYgMTA4MC0xNDkxIDIwMi05OCAzNTAtMTQzIDU3MC0xNzYgNjA5LTg5IDEyMjggMTE4IDE2NjMgNTU3IDU4OCA1OTUgNzMwIDE1MDAgMzUyIDIyNDQtMTA2IDIwOS0yMTYgMzU3LTM5MCA1MjUtMjkwIDI4MC02MzYgNDUzLTEwMzkgNTIwLTExMyAxOS00MDMgMjctNTE0IDE1eiIvPjxwYXRoIGQ9Im0xNzkyIDgzMzljLTMxMC0yNC02MzgtMTM1LTkwMi0zMDYtNzQ1LTQ4My0xMDY4LTE0MDMtNzkwLTIyNDUgMzI1LTk4MiAxMzYyLTE1MzYgMjM2Ni0xMjYzIDQ3MyAxMjkgODkzIDQ0OSAxMTUzIDg3OSAzNjIgNjAyIDM2MiAxMzkwIDAgMTk5Mi0xOTQgMzIxLTQ4OCA1OTEtODE0IDc0OS0xNzYgODYtMzI1IDEzNS01MTAgMTcwLTc3IDE0LTMyNCAzNi0zNzUgMzQtMTQtMS03MS01LTEyOC0xMHoiLz48cGF0aCBkPSJtNjI0NSA4MzQwYy0xMDE4LTg0LTE3OTUtOTI0LTE3OTUtMTk0MCAwLTg0NiA1NTEtMTYwMCAxMzU1LTE4NTQgMjA1LTY1IDM2My04OCA1OTAtODggNTE3IDAgOTc1IDE4NCAxMzQ4IDU0MSA3OTYgNzY0IDc5NiAyMDM4IDAgMjgwMi0yNTUgMjQ0LTU1MSA0MDctODk4IDQ5My0xNjAgNDAtNDI2IDYwLTYwMCA0NnoiLz48cGF0aCBkPSJtMTA2OTAgODMzOWMtNjIzLTQ3LTExOTEtNDAwLTE1MTktOTQzLTM2Mi02MDItMzYyLTEzOTAgMC0xOTkyIDE5NC0zMjEgNDg4LTU5MSA4MTQtNzQ5IDI0NS0xMTkgNDUxLTE3NCA3MjUtMTk1IDc4OS01OSAxNTUyIDM4OCAxODkyIDExMDggNDE3IDg4MSAxMTYgMTkzNC03MDIgMjQ2NS0xOTggMTI4LTQ1NSAyMzItNjgyIDI3Ni05OSAxOS0zMzkgNDMtMzk4IDQwLTE0LTEtNzItNS0xMzAtMTB6Ii8+PHBhdGggZD0ibTE2OTAgMzg3NWMtNjg1LTk0LTEyNjMtNTM1LTE1MzQtMTE2OS0yNDctNTc2LTE5NC0xMjU0IDEzNy0xNzg1IDE0Mi0yMjggMzUzLTQ0NSA1NzctNTk1IDQyNi0yODQgOTY0LTM4OSAxNDY3LTI4NiA3NzcgMTYwIDEzNzYgNzcxIDE1MjQgMTU1NSAzMCAxNTcgMzcgNDQ5IDE1IDYwOS0xMTEgNzk0LTY4MCAxNDMxLTE0NTUgMTYzMS0yMDAgNTItNTE5IDY5LTczMSA0MHoiLz48cGF0aCBkPSJtNjEzNSAzODc0Yy03MjUtOTgtMTMzNy01OTgtMTU3OC0xMjkxLTE4Ni01MzItMTI3LTExMzUgMTU4LTE2MTkgNDIwLTcxMyAxMjQxLTEwODUgMjA1MC05MjggMzg2IDc1IDczMCAyNTkgMTAxMCA1NDEgNzU2IDc1OSA3NTMgMTk4NS01IDI3NDMtMzA3IDMwNy02OTUgNDk5LTExMjMgNTU1LTE0MiAxOC0zNzUgMTgtNTEyLTF6Ii8+PHBhdGggZD0ibTEwNTU1IDM4NzBjLTIxMS0zMi0zNjMtNzktNTYxLTE3NS01ODktMjg1LTk4OC04MzYtMTA4MC0xNDkxLTIyLTE2MC0xNS00NTIgMTUtNjA5IDE0OC03ODQgNzQ3LTEzOTUgMTUyNC0xNTU1IDUwMy0xMDMgMTA0MSAyIDE0NjcgMjg2IDIyNCAxNTAgNDM1IDM2NyA1NzcgNTk1IDMzMSA1MzEgMzg0IDEyMDkgMTM3IDE3ODUtMjQyIDU2Ny03MzMgOTg0LTEzMjkgMTEzMC0yMzAgNTYtNTE5IDY5LTc1MCAzNHoiLz48L2c+PC9zdmc+"
            name="Тимофей Фалдин"
            slogan="Пмогаю в создании личного бренда и построении заработка на нем за 3 мес."
            :socialNetworks="[{
              title: 'Telegram'
            }, {
              title: 'WhatsApp'
            }]"
          />
        </slide>
      </carousel>
    </div>
    <div
      class="RegisterPage-Panel RegisterPage-Panel_Final"
      v-show="currentStep === 6"
    >
      <avatar
        class="RegisterPage-FinalAvatar"
        avatar="https://i.imgur.com/IwhKo8S.jpg"
        theme="blue"
        rounded="circle"
        size="m"
      />
      <paragraph
        :centered="true"
        size="super-l"
      >
        {{ userName }}
      </paragraph>
      <form-field
        class="RegisterPage-FinalLink"
        beforeText="vizi.one/"
        :disabled="true"
        :main=true
        theme="blue"
        :slim=true
        :valid=true
        :validate=true
        :value="link"
      />
    </div>
    <form-field
      class="RegisterPage-Profession"
      v-show="currentStep === 4"
      placeholder="Ваша профессия или хобби"
      v-on:input="onProfessionInput"
    />
    <paragraph
      class="RegisterPage-FinalTip"
      v-show="currentStep === 6"
      size="l"
      :centered=true
    >
      Ваша визитка будет опубликована после подтверждения вашего e-mail
    </paragraph>
    <div :class="`RegisterPage-SubmitContainer${currentStep === 5 ? ' RegisterPage-SubmitContainer_Slim' : ''}`">
      <form-button
        class="RegisterPage-SubmitButton"
        :disabled="
          ((currentStep === 2) && !avatarUploaded) ||
          ((currentStep === 3) && !userName) ||
          ((currentStep === 4) && !(aboutText && profession))
        "
        icon="arrow-white"
        :slim="currentStep === 5"
        theme="blue"
        v-on:click="onNext"
      >
        {{ { 5: 'Выбрать', 6: 'Личный кабинет' }[currentStep] || 'Далее' }}
      </form-button>
      <form-button
        class="RegisterPage-SkipButton"
        v-show="((currentStep === 2) && !avatarUploaded) || currentStep === 4"
        theme="pseudo"
        v-on:click="onSkip"
      >
      {{
        {
          2: 'Пропустить',
          4: 'Заполнить позже'
        }[this.currentStep]
      }}
      </form-button>
    </div>
    <paragraph
      v-show="currentStep === 1"
      size="s"
      :centered=true
    >
      По этой ссылке будут находить твою визитку.
    </paragraph>
  </main>
</template>

<script>
import '../Theme/_SignUp/Theme_SignUp.styl';
import '../Typo/Typo.styl';
import './RegisterPage.styl';

import Avatar from '../Avatar/Avatar.vue';
import CardHeader from '../CardHeader/CardHeader.vue';
import { Carousel, Slide } from 'vue-carousel';
import FormButton from '../FormButton/FormButton.vue';
import FormField from '../FormField/FormField.vue';
import KProgress from 'k-progress';
import Paragraph from '../Paragraph/Paragraph.vue';
import Placeholder from '../Placeholder/Placeholder.vue';
import TextInput from '../TextInput/TextInput.vue';
import vue2Dropzone from 'vue2-dropzone';

import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name: 'RegisterPage',
  props: {
    step: String
  },
  components: {
    Avatar,
    CardHeader,
    Carousel,
    FormButton,
    FormField,
    KProgress,
    Paragraph,
    Placeholder,
    Slide,
    TextInput,
    vue2Dropzone
  },
  data() {
    return {
      aboutText: '',
      avatarUploaded: false,
      currentStep: +this.step,
      dropzoneOptions: {
        url: '/upload-avatar',
        thumbnailWidth: 118,
        maxFilesize: 0.5,
        dictDefaultMessage: 'Загрузить'
      },
      profession: '',
      userName: '',
      link: ''
    };
  },
  computed: {
    avatarText() {
      return this.avatarUploaded ? 'Успешно загружено!' : 'Загрузи свое фото или аватар';
    },
    displayStep() {
      return this.currentStep > 5 ? 5 : this.currentStep
    }

  },
  methods: {
    onBackClick() {
      this.currentStep--;
      this.$router.go(-1);
    },
    onNext() {
      this.currentStep++;
      if (this.currentStep < 7) {
        this.$router.push('/register/' + this.currentStep);
      } else {
        this.$router.push('/');
      }

    },
    onSkip() {
      this.currentStep++;
      this.$router.push('/register/' + this.currentStep);
    },
    onUploadComplete() {
      this.avatarUploaded = true;
    },
    onDeleteClick() {
      this.$refs.myVueDropzone.removeAllFiles(true);

      this.avatarUploaded = false;
    },
    onUploadClick() {
      const dropzone = this.$refs.myVueDropzone;

      dropzone.removeAllFiles(true);
      dropzone.$el.click();
    },
    onLinkInput(value) {
      this.link = value;
    },
    onNameInput(value) {
      this.userName = value;
    },
    onAboutInput(value) {
      this.aboutText = value;
    },
    onProfessionInput(value) {
      this.profession = value
    }
  }
}
</script>
