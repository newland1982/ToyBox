<template>
  <div class="wrapperBlogOrigin">
    <!-- <watcherRoute
      @postImageBlogOrigin="postImage"
      @focusBlogOrigin="focus" /> -->
    <watcherRoute
      @focusBlogOrigin="focus"
      @restoreSliderPositionBlogOrigin="restoreSliderPosition"
    />
    <div
      v-show="modePreview === 'normal' || modePreview === 'temporaryNormal'"
      class="containerNormalBlogOrigin"
    >
      <div class="boxPreviewNormalBlogOrigin">
        <div
          v-slightMarkdown
          ref="divPreviewNormalBlogOrigin"
          :style="[heightPreview, paddingRight]"
          :key="inputText"
          class="divPreviewNormalBlogOrigin"
          readonly
          spellcheck="false"
          @click="changeModePreview"
          @scroll="storeSliderPosition"
        >
          {{ inputText }}
        </div>
      </div>
      <div class="boxInputNormalBlogOrigin">
        <input
          ref="fileInputNormalBlogOrigin"
          type="file"
          name="fileImageBlogOrigin"
          accept="image/jpg, image/jpeg, image/png"
          @change="selectFile"
        />
        <div class="wrapperClipIconNormalBlogOrigin">
          <!-- <div
            v-show="!(limitImage <= 0)"
            :style="loading"
            class="clipIconNormalBlogOrigin">
            <img
              src="../../assets/clip.svg"
              @click="clickInputFile">
          </div> -->
          <div
            v-show="inputImage === 'available'"
            class="clipIconNormalBlogOrigin"
          >
            <img src="../../assets/clip.svg" @click="clickInputFile" />
          </div>
        </div>
        <!-- <button
          ref="postImage"
          class="postButtonNormalBlogOrigin"
          type="submit"
          @click="postImage"/> -->
        <textarea
          ref="inputTextareaBlogOrigin"
          v-model="inputText"
          class="inputTextareaBlogOrigin"
          maxlength="800"
          autofocus
          spellcheck="false"
          wrap="hard"
          @click.once="deleteSample"
        />
        <button class="normalButton" @click="submitBlogOrigin">
          Post
        </button>
      </div>
    </div>
    <div
      v-show="modePreview === 'expanded'"
      :style="[
        alignContentExpandedLongDisplayBlogOrigin,
        marginContainerExpandedLongDisplayBlogOrigin
      ]"
      class="containerExpandedLongDisplayBlogOrigin"
    >
      <div class="boxPreviewExpandedBlogOrigin">
        <div
          v-slightMarkdown
          ref="divPreviewExpandedBlogOrigin"
          :style="[heightPreview, paddingRight]"
          :key="inputText"
          class="divPreviewExpandedBlogOrigin"
          readonly
          spellcheck="false"
          @click="changeModePreview"
          @scroll="storeSliderPosition"
        >
          {{ inputText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aws from 'aws-sdk';
import axios from 'axios';
import slightMarkdown from '../../functions/blog/slightMarkdown';
import randomNumberGenerator from '../../functions/etcetera/randomNumberGenerator';
import { configApiUrl } from '../../../CONFIG/CONFIG';
import watcherRoute from '../../components/watcherRoute.vue';

export default {
  name: 'BlogOrigin',
  components: {
    watcherRoute
  },
  directives: {
    slightMarkdown
  },
  data() {
    return {
      heightPreview: { '--heightPreview': '193px' },
      alignContentExpandedLongDisplayBlogOrigin: {
        '--alignContentExpandedLongDisplayBlogOrigin': 'center'
      },
      marginContainerExpandedLongDisplayBlogOrigin: {
        '--marginContainerExpandedLongDisplayBlogOrigin': '0rem'
      },
      browser: 'noFirefox',
      limitImage: 5,
      inputImage: 'available',
      inputText: '*italic*\n**bold**',
      inputTextBeforeCursor: '',
      inputTextAfterCursor: '',
      cursorPosition: 0,
      adjustedFileImage: null,
      adjustedFileImageUrl: '',
      adjustedFileImageUrlArray: [],
      adjustedFileImageUrlDictionary: {},
      // sway: 'paused',
      text: '',
      verticalSizeDisplay: 'long',
      modePreview: 'normal',
      countLineBreakBeforeCursor: 0,
      scrollHeightPreview: 0,
      scrollTopPreview: 0,
      sliderPosition: 0,
      widthImageFrame: 234
    };
  },
  computed: {
    // loading() {
    //   return `--loading: ${this.sway}`;
    // },
    paddingRight() {
      if (this.browser === 'firefox' || this.$root.zoomScale > 1.25) {
        return { '--paddingRight': '8px' };
      }
      return { '--paddingRight': '16px' };
    }
  },
  watch: {
    inputText() {
      this.$nextTick(() => {
        this.arrangeInput();
        this.changeSliderPositionByText();
        this.storeSliderPosition();
        this.storeCursorPosition();
      });

      const regexImage = new RegExp(
        '#(blob:.+[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})#',
        'g'
      );
      if (
        this.limitImage - (this.inputText.match(regexImage) || []).length >
        0
      ) {
        this.inputImage = 'available';
      } else {
        this.inputImage = 'unavailable';
      }

      // this.changeSliderPositionByText();
      // this.storeSliderPosition();
    }
  },
  created() {
    this.$watch(
      () => [this.$root.appHeight, this.modePreview],
      () => {
        this.setViewBlogOrigin();
        this.restoreSliderPosition();
      }
    );
  },
  updated() {
    // console.log('ex', this.$refs.divPreviewExpandedBlogOrigin.scrollTop)
    // console.log('no', this.$refs.divPreviewNormalBlogOrigin.scrollTop)
    // const regexImage = new RegExp('#(blob:.+[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})#', 'g');
    // this.limitImage = this.limitImage - (this.inputText.match(regexImage) || []).length;
    // this.arrangeInput();
    // if (
    //   (this.methodChangeSliderPositionByText === 'active') &&
    //   ((this.modePreview === 'normal') || (this.modePreview === 'temporaryNormal'))
    // ) {
    //   this.changeSliderPositionByText();
    // }
  },
  mounted() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('firefox') !== -1) {
      this.browser = 'firefox';
    }
  },
  methods: {
    focus() {
      this.$refs.inputTextareaBlogOrigin.focus();
    },
    deleteSample() {
      this.inputText = '';
    },
    changeModePreview() {
      // this.methodChangeSliderPositionByText = 'inactive';
      if (this.$root.appHeight >= 568) {
        this.verticalSizeDisplay = 'long';
      } else {
        this.verticalSizeDisplay = 'short';
      }

      if (
        this.verticalSizeDisplay === 'long' &&
        this.modePreview === 'expanded'
      ) {
        this.scrollHeightPreview = this.$refs.divPreviewExpandedBlogOrigin.scrollHeight;
        this.modePreview = 'normal';
      } else if (
        this.verticalSizeDisplay === 'long' &&
        this.modePreview === 'normal'
      ) {
        this.scrollHeightPreview = this.$refs.divPreviewNormalBlogOrigin.scrollHeight;

        // const elementPreviewNormal = this.$refs.divPreviewNormalBlogOrigin;
        // const sliderPosition = elementPreviewNormal.scrollTop;

        this.modePreview = 'expanded';
        // this.$nextTick(() => {
        //   const elementPreviewExpanded = this.$refs.divPreviewExpandedBlogOrigin;
        //   elementPreviewExpanded.scrollTop = this.sliderPosition;
        // });
      }
      this.restoreCursorPosition();
    },
    setViewBlogOrigin() {
      if (this.$root.appHeight >= 568) {
        this.verticalSizeDisplay = 'long';
      } else {
        this.verticalSizeDisplay = 'short';
      }
      if (
        this.verticalSizeDisplay === 'long' &&
        this.modePreview === 'expanded'
      ) {
        this.alignContentExpandedLongDisplayBlogOrigin = {
          '--alignContentExpandedLongDisplayBlogOrigin': 'center'
        };
        if (this.scrollHeightPreview < 193) {
          this.modePreview = 'normal';
          this.heightPreview = { '--heightPreview': '193px' };
        } else if (
          this.scrollHeightPreview >= 193 &&
          this.scrollHeightPreview < 464
        ) {
          this.heightPreview = { '--heightPreview': 'auto' };
        } else {
          this.heightPreview = { '--heightPreview': '480px' };
        }
        if (
          this.$root.appWidthSize === 'xSmall' ||
          this.$root.appWidthSize === 'small'
        ) {
          this.marginContainerExpandedLongDisplayBlogOrigin = {
            '--marginContainerExpandedLongDisplayBlogOrigin': '-1rem'
          };
        } else {
          this.marginContainerExpandedLongDisplayBlogOrigin = {
            '--marginContainerExpandedLongDisplayBlogOrigin': '0rem'
          };
        }
        return;
      }
      if (
        this.verticalSizeDisplay === 'long' &&
        this.modePreview === 'temporaryNormal'
      ) {
        this.modePreview = 'expanded';
        return;
      }
      if (
        this.verticalSizeDisplay === 'short' &&
        this.modePreview === 'expanded'
      ) {
        this.modePreview = 'temporaryNormal';
      }
    },
    arrangeInput() {
      const elementInput = this.$refs.inputTextareaBlogOrigin;

      this.inputTextBeforeCursor = this.inputText.substr(
        0,
        elementInput.selectionStart
      );
      this.inputTextAfterCursor = this.inputText.substr(
        elementInput.selectionStart,
        this.inputText.length
      );

      this.countLineBreakBeforeCursor = (
        this.inputTextBeforeCursor.match(/\n/g) || []
      ).length;
    },
    changeSliderPositionByText() {
      // if (
      //   (this.methodChangeSliderPositionByText === 'active') &&
      //   ((this.modePreview === 'normal') || (this.modePreview === 'temporaryNormal'))
      // ) {
      //   const elementPreviewNormal = this.$refs.divPreviewNormalBlogOrigin;
      //
      //   if (this.countLineBreakBeforeCursor) {
      //     elementPreviewNormal.scrollTop =
      //       Array.from(elementPreviewNormal.getElementsByTagName('br'))[this.countLineBreakBeforeCursor - 1]
      //         .getBoundingClientRect().top
      //         - elementPreviewNormal.getBoundingClientRect().top - 39;
      //   }
      // }
      const elementPreviewNormal = this.$refs.divPreviewNormalBlogOrigin;

      if (this.countLineBreakBeforeCursor) {
        elementPreviewNormal.scrollTop =
          Array.from(elementPreviewNormal.getElementsByTagName('br'))[
            this.countLineBreakBeforeCursor - 1
          ].getBoundingClientRect().top -
          elementPreviewNormal.getBoundingClientRect().top -
          39;
      }
    },
    changeSliderPositionByImage(lengthToImageBottom) {
      const elementInput = this.$refs.inputTextareaBlogOrigin;
      const elementPreviewNormal = this.$refs.divPreviewNormalBlogOrigin;

      elementPreviewNormal.scrollTop =
        lengthToImageBottom - elementPreviewNormal.getBoundingClientRect().top;
      elementInput.scrollTop += 37;
    },
    storeSliderPosition() {
      if (this.modePreview === 'expanded') {
        const elementPreviewExpanded = this.$refs.divPreviewExpandedBlogOrigin;
        if (
          elementPreviewExpanded.scrollHeight >
          elementPreviewExpanded.clientHeight
        ) {
          this.sliderPosition =
            elementPreviewExpanded.scrollTop /
            (elementPreviewExpanded.scrollHeight -
              elementPreviewExpanded.clientHeight);
        }
      } else {
        const elementPreviewNormal = this.$refs.divPreviewNormalBlogOrigin;
        if (
          elementPreviewNormal.scrollHeight > elementPreviewNormal.clientHeight
        ) {
          this.sliderPosition =
            elementPreviewNormal.scrollTop /
            (elementPreviewNormal.scrollHeight -
              elementPreviewNormal.clientHeight);
        }
      }
    },
    restoreSliderPosition() {
      this.$nextTick(() => {
        if (this.modePreview === 'expanded') {
          const elementPreviewExpanded = this.$refs
            .divPreviewExpandedBlogOrigin;
          elementPreviewExpanded.scrollTop =
            (elementPreviewExpanded.scrollHeight -
              elementPreviewExpanded.clientHeight) *
            this.sliderPosition;
        } else {
          const elementPreviewNormal = this.$refs.divPreviewNormalBlogOrigin;
          elementPreviewNormal.scrollTop =
            (elementPreviewNormal.scrollHeight -
              elementPreviewNormal.clientHeight) *
            this.sliderPosition;
        }
      });
    },
    storeCursorPosition() {
      this.cursorPosition = this.$refs.inputTextareaBlogOrigin.selectionStart;
      console.log(this.cursorPosition);
    },
    restoreCursorPosition() {
      this.$nextTick(() => {
        this.focus();
        this.$refs.inputTextareaBlogOrigin.setSelectionRange(
          this.cursorPosition,
          this.cursorPosition
        );
      });
    },
    clickInputFile() {
      this.$refs.fileInputNormalBlogOrigin.click();
    },
    selectFile(event) {
      this.$refs.inputTextareaBlogOrigin.click();
      // this.methodChangeSliderPositionByText = 'inactive';
      event.preventDefault();
      // this.sway = 'running';
      const selectedFile = event.target.files[0];
      // console.log(selectedFile.type)
      if (
        selectedFile.type === 'image/jpg' ||
        selectedFile.type === 'image/jpeg' ||
        selectedFile.type === 'image/png'
      ) {
        this.adjustFileImage(selectedFile);
      }
    },
    adjustFileImage(selectedFile) {
      const roughCanvas = document.createElement('canvas');
      const roughContext = roughCanvas.getContext('2d');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const image = new Image();
      let url;
      if (selectedFile) {
        url = URL.createObjectURL(selectedFile);
        this.$refs.fileInputNormalBlogOrigin.value = '';
      }
      // selectedFile = null;
      // else {
      //   this.sway = 'paused';
      // }
      image.src = url;
      image.onload = () => {
        const steps =
          Math.floor(Math.log2(image.width / this.widthImageFrame)) - 1;
        // console.log(image.width)
        if (image.width > this.widthImageFrame * 2) {
          roughCanvas.width = image.width * 0.5;
          roughCanvas.height = image.height * 0.5;
          roughContext.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            roughCanvas.width,
            roughCanvas.height
          );
          for (let i = 0; i < steps; i += 1) {
            roughContext.drawImage(
              roughCanvas,
              0,
              0,
              roughCanvas.width,
              roughCanvas.height,
              0,
              0,
              roughCanvas.width * 0.5,
              roughCanvas.height * 0.5
            );
          }
          canvas.width = this.widthImageFrame;
          canvas.height = image.height * (this.widthImageFrame / image.width);
          context.drawImage(
            roughCanvas,
            0,
            0,
            roughCanvas.width * 0.5 ** steps,
            roughCanvas.height * 0.5 ** steps,
            0,
            0,
            canvas.width,
            canvas.height
          );
        }
        if (image.width <= this.widthImageFrame * 2) {
          canvas.width = this.widthImageFrame;
          canvas.height = image.height * (this.widthImageFrame / image.width);
          context.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
        }
        canvas.toBlob(
          blob => {
            this.adjustedFileImage = new File(
              [blob],
              `${JSON.parse(
                localStorage.getItem('username')
              )}_${randomNumberGenerator()}_image.jpeg`,
              { type: 'image/jpeg' }
            );
            this.adjustedFileImageUrl = URL.createObjectURL(
              this.adjustedFileImage
            );

            const adjustedFileImageUrlDictionaryLocal = this
              .adjustedFileImageUrlDictionary;
            adjustedFileImageUrlDictionaryLocal[
              this.adjustedFileImageUrl
            ] = this.adjustedFileImage;
            this.adjustedFileImageUrlDictionary = adjustedFileImageUrlDictionaryLocal;

            this.$refs.inputTextareaBlogOrigin.focus();
            this.$refs.inputTextareaBlogOrigin.click();
            this.arrangeInput();
            this.inputText = `${this.inputTextBeforeCursor}\n#${this.adjustedFileImageUrl}#\n${this.inputTextAfterCursor}`;

            const cursorPosition = `${this.inputTextBeforeCursor}\n#${this.adjustedFileImageUrl}#\n`
              .length;
            // this.$refs.postImage.click();
            this.$nextTick(() => {
              const elementImg = this.$refs.divPreviewNormalBlogOrigin.querySelector(
                `img[src="${this.adjustedFileImageUrl}"]`
              );
              elementImg.onload = () => {
                // this.methodChangeSliderPositionByText = 'inactive';
                this.changeSliderPositionByImage(
                  elementImg.getBoundingClientRect().top
                );
                // this.methodChangeSliderPositionByText = 'active';
                // this.sway = 'paused';
                this.$refs.inputTextareaBlogOrigin.setSelectionRange(
                  cursorPosition,
                  cursorPosition
                );
                this.storeCursorPosition();
                // if (this.$root.suspendedStatePostImageBlogOrigin) {
                //   this.changeSliderPositionByText();
                // }
                // this.$root.suspendedStatePostImageBlogOrigin = false;
                this.arrangeInput();
                this.changeSliderPositionByText();
              };
            });
          },
          'image/jpeg',
          1
        );
        URL.revokeObjectURL(url);
      };
    },
    // async postImage() {
    //   if (!this.adjustedFileImage) {
    //     return;
    //   }
    //   this.$refs.inputTextareaBlogOrigin
    //     .focus();
    //   this.$refs.inputTextareaBlogOrigin.click();
    //   const readyFileImage = new FormData();
    //   readyFileImage.append('fileImageBlogOrigin', this.adjustedFileImage);
    //   const response = await axios.post(
    //     `${configApiUrl}/blog/origin/image`,
    //     readyFileImage,
    //     {
    //       headers:
    //       {
    //         'Content-Type': 'multipart/form-data',
    //         Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
    //       },
    //     },
    //   ).catch(error => error.response);
    //   if (response.data.message !== 'fileHasBeenUploaded') {
    //     // this.$root.suspendedStatePostImageBlogOrigin = true;
    //     // this.sway = 'paused';
    //     this.$store.commit('path/storePath', this.$route.path);
    //     this.$router.push({ path: '/mypage/signuporsignin' });
    //     return;
    //   }
    //   this.limitImage = this.limitImage - 1;
    //
    //   this.inputText =
    //   `${this.inputTextBeforeCursor}\n#${configStorageUrl}/blog/origin/image/${response.data.filename}#\n${this.inputTextAfterCursor}`;
    //
    //   this.cursorPoint =
    //   `${this.inputTextBeforeCursor}\n#${configStorageUrl}/blog/origin/image/${response.data.filename}#\n`.length;
    //
    //   this.$nextTick(() => {
    //     const elementImg = this.$refs.divPreviewNormalBlogOrigin
    //       .querySelector(`img[src="${configStorageUrl}/blog/origin/image/${response.data.filename}"]`);
    //     elementImg.onload = () => {
    //       this.changeSliderPositionByImage(elementImg.getBoundingClientRect().top);
    //       // this.sway = 'paused';
    //       this.$refs.inputTextareaBlogOrigin
    //         .setSelectionRange(this.cursorPoint, this.cursorPoint);
    //       // if (this.$root.suspendedStatePostImageBlogOrigin) {
    //       //   this.changeSliderPositionByText();
    //       // }
    //       // this.$root.suspendedStatePostImageBlogOrigin = false;
    //     };
    //   });
    // },

    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-await-in-loop */
    async submitBlogOrigin() {
      this.text = this.inputText;

      this.adjustedFileImageUrlArray = this.inputText.match(
        /blob:.+[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g
      );
      if (!this.adjustedFileImageUrlArray) {
        return;
      }
      for (const adjustedFileImageUrl of this.adjustedFileImageUrlArray) {
        // const readyFileImage = new FormData();
        // // console.log(this.adjustedFileImageUrlDictionary)
        // // console.log(adjustedFileImageUrl)
        // // console.log(this.adjustedFileImageUrlDictionary[adjustedFileImageUrl])
        // readyFileImage.append('fileImageBlogOrigin', this.adjustedFileImageUrlDictionary[adjustedFileImageUrl]);
        // console.log(111)
        // console.log(readyFileImage.get('fileImageBlogOrigin').name);
        // // const response = await axios.post(
        // //   `${configApiUrl}/blog/origin/image`,
        // //   readyFileImage,
        // //   {
        // //     headers:
        // //     {
        // //       'Content-Type': 'multipart/form-data',
        // //       Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
        // //     },
        // //   },
        // // ).catch(error => error.response);
        // // console.log(response.data.message);
        // const nameReadyFileImage = readyFileImage.get('fileImageBlogOrigin').name;
        // this.uploadFileImage('123/fdffd', readyFileImage)
        const username = JSON.parse(localStorage.getItem('username'));
        const randomNumber = randomNumberGenerator();
        const type = 'image.jpeg';
        const readyFileImage = this.adjustedFileImageUrlDictionary[
          adjustedFileImageUrl
        ];
        const response = this.uploadFileImage(
          username,
          randomNumber,
          type,
          readyFileImage
        );
        console.log('response', response);
        // const responseS3 = this.uploadFileImage(responseSts);
        // console.log('responseS3', responseS3)
        if (response) {
          // this.$root.suspendedStatePostImageBlogOrigin = true;
          // this.sway = 'paused';
          // this.text = this.text.replace(adjustedFileImageUrl, `#${configStorageUrl}/blog/origin/image/${response.data.filename}#`);
          // this.$store.commit('path/storePath', this.$route.path);
          // this.$router.push({ path: '/mypage/signuporsignin' });
          // console.log(this.text);
        }
      }
      /* eslint-enable no-restricted-syntax */
      /* eslint-enable no-await-in-loop */
    },
    async uploadFileImage(username, randomNumber, type, readyFileImage) {
      const response1 = await axios
        .post(
          `${configApiUrl}/blog/origin/image`,
          {},
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
            }
          }
        )
        .catch(error => error.response);

      const response2 = await new aws.S3({
        region: '***',
        accessKeyId: response1.data.accessKeyId,
        secretAccessKey: response1.data.secretAccessKey,
        sessionToken: response1.data.sessionToken
      })
        .putObject({
          Body: readyFileImage,
          Bucket: `***-blog-origin-image/${username}`,
          Key: `${randomNumber}_${response1.data.utcDate}_${type}`
        })
        .promise()
        .catch(error => error.stack);
      console.log(response2);
      return response2;
    }
  }
};
</script>

<style scoped>
.wrapperBlogOrigin {
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 100%;
}
.containerNormalBlogOrigin {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fit, 270px);
  justify-content: center;
  align-content: center;
  grid-column-gap: 12px;
}

.divPreviewNormalBlogOrigin {
  background: #ffffff;
  width: 270px;
  height: 193px;
  font-size: 13px;
  border-top: 8px solid #ffffff;
  border-right: 1.5px solid #ffffff;
  border-bottom: 8px solid #ffffff;
  border-left: 1.5px solid #ffffff;
  border-radius: 8px;
  padding: 16px;
  padding-top: 8px;
  padding-right: var(--paddingRight);
  padding-bottom: 8px;
  margin-top: 20px;
  margin-bottom: 8px;
  resize: none;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  overflow-y: scroll;
}

.boxInputNormalBlogOrigin input {
  display: none;
}
.wrapperClipIconNormalBlogOrigin {
  height: 20px;
}
.clipIconNormalBlogOrigin img {
  display: inline-block;
  color: #ffffff;
  width: 14px;
  height: 14px;
  margin-left: 8px;
  line-height: 20px;
  margin-bottom: -3px;
  cursor: pointer;
  /* animation: sway 0.5s linear infinite;
  animation-direction: alternate-reverse;
  animation-play-state: var(--loading); */
}
/* @keyframes sway {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
} */
.postButtonNormalBlogOrigin {
  display: none;
}

.boxInputNormalBlogOrigin textarea {
  width: 270px;
  height: 193px;
  font-size: 13px;
  border-top: 8px solid #ffffff;
  border-right: 1.5px solid #ffffff;
  border-bottom: 8px solid #ffffff;
  border-left: 1.5px solid #ffffff;
  border-radius: 8px;
  padding: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-bottom: 10px;
  cursor: auto;
  resize: none;
  word-break: break-all;
}
.boxInputNormalBlogOrigin button {
  width: 270px;
  margin-bottom: 20px;
  cursor: pointer;
}

.containerExpandedLongDisplayBlogOrigin {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fit, 270px);
  justify-content: center;
  align-content: var(--alignContentExpandedLongDisplayBlogOrigin);
  grid-column-gap: 12px;
  margin-top: var(--marginContainerExpandedLongDisplayBlogOrigin);
}
.divPreviewExpandedBlogOrigin {
  background: #ffffff;
  width: 270px;
  height: var(--heightPreview);
  font-size: 13px;
  border-top: 8px solid #ffffff;
  border-right: 1.5px solid #ffffff;
  border-bottom: 8px solid #ffffff;
  border-left: 1.5px solid #ffffff;
  border-radius: 8px;
  padding: 16px;
  padding-top: 8px;
  padding-right: var(--paddingRight);
  padding-bottom: 8px;
  margin-top: 20px;
  margin-bottom: 8px;
  resize: none;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  overflow-y: scroll;
}
</style>
