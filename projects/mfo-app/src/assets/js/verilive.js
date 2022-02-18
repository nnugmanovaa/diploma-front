const url = "https://services.verigram.ai:8443/verilive/verilive"
    const apiKey = "uwXc6fuoPnMPqXMlLKdMjOvrQhdHLvKk";

    async function runVerilive() {
      document.getElementById('id_verilive').innerHTML = verilive.version

      config = {
          'recordVideo': false,
          'videoBitrate': 2500000,
          'rotated': false,
          'lang': "custom",

          'render': {
              'oval': true,
              'faceContourInsteadOfOval': true,
              'ovalRingColor': {
                  'default': '#f5f542',
                  'actionSuccess': '#00ba00',
                  'actionFailure': '#d00000',
                  'sessionSuccess': '#00ba00',
                  'sessionFailure': '#d00000',
              },
              'ovalWidth': 2.0,

              'overlay': true,
              'overlayColor': {
                  'default' : '#2f4f4f',
              },
              'overlayTransparency': {
                  'default': 0.55,
              },

              'arrow': true,
              'arrowColor': {
                  'default': '#f0f0f0',
              },
              'arrowProgressColor': {
                  'default': '#404040',
              },

              'hint': true,
              'hintTextColor': {
                  "default": "#eee",
              },
              'hintFontType': "Arial",
              'hintUseProgressiveFontSize': true,
              'hintProgressiveFontSizeMultiplier': 1.0,
              'hintFontSize': 25,
              "hintCloudColor": {
                  "default": "#2d312f",
              },

              'videoUploadProgressBar': true,
              'videoUploadProgressBarColor1': "#FFEA82",
              'videoUploadProgressBarColor2': "#eee",
          },

          'hints': {
              "noHint": "",
              "noFace": "Вас Не Видно",
              "badLight": "Выравните Освещение",
              "closer": "Ближе",
              "away": "Отдалитесь",
              "closerToCenter": "Ближе к Центру Экрана",
              "targetLeft": "Медленно Поворачивайте Голову Влево",
              "targetRight": "Медленно Поворачивайте Голову Вправо",
              "targetCenter": "Посмотрите Прямо",
              "waitForProcessing": "Подождите, идет обработка...",
              "sessionSuccess": "Вы Прошли!",
              "sessionFailure": "Вы Не Прошли!",
              "sessionError": "Произошла какая-то ошибка. Попробуйте перезапустить",
              "clickMe": "Нажмите",
              'sessionSuccess': 'Вы Прошли!',
              'sessionFailure': 'Вы Не Прошли!',
              'sessionError': 'Произошла какая-то ошибка. Попробуйте перезапустить',
              "NotSupportedBrowserError": "Ваш браузер не поддерживается. Пожалуйста, используйте последние браузера Chrome, Firefox, Safari или Edge.",
              "NoWrapperError": "Что-то не так, попробуйте позже",
              "CameraNotFoundError": "Веб-камера не найдена. Пожалуйста, подсоедините веб-камеру к устройству и обновите эту страничку.",
              "CameraNotAllowedError": "Отказано в доступе к веб-камере. Пожалуйста, обновите эту страничку и разрешите доступ к веб-камере.",
              "CameraOverconstrainedError": "Веб-камера с минимальным разрешением 480p не найдена. Пожалуйста, подсоедините веб-камеру 480p (или выше) и обновите эту страничку.",
              "CameraSecurityError": "Ваш браузер отказал в доступе к веб-камере. Пожалуйста, измените настройки доступа к веб-камере в Вашем браузере.",
              "CameraNotReadableError": "Ошибка веб-камеры - невозможно прочитать данные с веб-камеры. Пожалуйста, проверьте Вашу веб-камеру.",
              "CameraAbortError": "Ошибка веб-камеры - невозможно прочитать данные с веб-камеры. Пожалуйста, проверьте Вашу веб-камеру.",
              "SlowInternetError": "Плохое соединение. Попробуйте подключиться к более быстрому интернету",
              "ServerWorkError": "Что-то не так с сервером, попробуйте еще раз",
              "ServerAuthorizationError": "Что-то не так, попробуйте позже",
              "ServerConnectionError": "Сервер не доступен. Проверьте интернет, попробуйте поменять сеть, выключить VPN",
              "ClientWorkError": "Что-то не так, попробуйте еще раз"
          },
      };

      verilive.successCallback = successCallback;
      verilive.failCallback = failCallback;
      verilive.errorCallback = errorCallback;
      verilive.updateCallback = updateCallback;
      verilive.videoRecordingNotSupportedCallback = videoRecordingNotSupportedCallback;
      verilive.videoReadyCallback = videoReadyCallback;
      verilive.videoSentCallback = videoSentCallback;
      verilive.videoSendProgressCallback = videoSendProgressCallback;
      verilive.videoSendErrorCallback = videoSendErrorCallback;

      verilive.init(url, apiKey, config)
        .then(() => {
          onStartButtonClick()
        })
        .catch((error) => {
          document.getElementById("results").value = error;
        });
    }

    function loadVideo(){
      window.addEventListener("load", runVerilive, false);
    }

    function onInitButtonClick() {
        console.log(verilive.started)
        // if(verilive.started){
          verilive.dispose();
        // }
        runVerilive();
        document.getElementById("ChangeText").innerHTML = 'Попробовать еще раз';
      }

    // Successful VeriLive json results
    function successCallback(data) {
      // E.g. Show results to user

      document.getElementById("NextShow").hidden = false;
      document.getElementById("vfInfo").hidden = true;
      // console.log(data)
      // document.getElementById("results").value = JSON.stringify(data, undefined, 2).replace(/</g, "&lt;");
      document.getElementById("results").value = data?.bestFrame.replace('data:image/jpeg;base64,','');
      verilive.dispose();
      var event = new Event('build',{ data: 'run' });
      window.dispatchEvent(event);
    }

    // Failure VeriLive json results
    function failCallback(data) {
      // E.g. Show to user, say to retry again
      // verilive.dispose();
      // document.getElementById("results").value = JSON.stringify(data, undefined, 2).replace(/</g, "&lt;");
    }

    function errorCallback(data) {
      // E.g. Show to user, say to retry again
      // verilive.dispose();
      // document.getElementById("results").value = JSON.stringify(data, undefined, 2).replace(/</g, "&lt;");
    }

    function updateCallback(data) {
      // console.log(data);
    }

    function videoRecordingNotSupportedCallback() {
      console.log("video recording is not supported on this browser/device");
    }

    function videoReadyCallback(blob) {
      window.video_blob = blob
      console.log(`Video is ready`)
    }

    function videoSendProgressCallback(event) {
      // console.log("Downloaded " + event.loaded + "bytes of " + event.total);
    }

    function videoSendErrorCallback() {
      console.log('videoSendErrorCallback');
    }

    function videoSentCallback() {
      console.log(`Video sending has finished`)
    }

    function onStartButtonClick() {
      const token = verilive.start();
      console.log(verilive.name + ': Token - ' + token);
      // document.getElementById('info_current_session').innerHTML = token
    }

    function onDisposeButtonClick() {
      verilive.dispose();
    }

    function copyTextToClipboard(text) {
      let textArea = document.createElement("textarea");

      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = 0;
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.value = text;

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }

      document.body.removeChild(textArea);
    }

    function onCopySessionIdClick() {
      // copyTextToClipboard(document.getElementById('info_current_session').innerHTML);
    }

    function onStopButtonClick() {
      verilive.stop();
    }
